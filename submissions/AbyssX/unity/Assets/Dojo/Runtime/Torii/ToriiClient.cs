using System;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;
using dojo_bindings;
using Dojo.Starknet;
namespace Dojo.Torii
{
    public unsafe class ToriiClient
    {
        private dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate onEntityStateUpdate;
        private dojo.FnPtr_Void.@delegate onSyncModelUpdate;
        private dojo.FnPtr_CString_CString_CString_CString_CArrayu8_Void.@delegate onMessage;
        private dojo.ToriiClient* client;

        public ToriiClient(string toriiUrl, string rpcUrl, string relayUrl, string world)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            CString crelayUrl = CString.FromString(relayUrl);
            CString cworld = CString.FromString(world);

            var result = dojo.client_new(ctoriiUrl, crpcUrl, crelayUrl, cworld, (dojo.KeysClause*)0, (UIntPtr)0);
            if (result.tag == dojo.ResultToriiClient_Tag.ErrToriiClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;

            RegisterEntityStateUpdateEvent(new dojo.FieldElement[] { });
            RegisterOnMessageEvent();
        }

        // We assume the torii client won't be copied around.
        // So we can free the underlying c client when the managed client is garbage collected.
        ~ToriiClient()
        {
            dojo.client_free(client);
        }

        public dojo.WorldMetadata WorldMetadata()
        {
            // TODO: implement a managed type for WorldMetadata too
            dojo.WorldMetadata worldMetadata = dojo.client_metadata(client);

            return worldMetadata;
        }

        // NOT USED? potentially deprecated
        // [CanBeNull]
        // public Model Model(dojo.KeysClause query)
        // {
        //     dojo.ResultCOptionTy result = dojo.client_model(client, &query);
        //     if (result.tag == dojo.ResultCOptionTy_Tag.ErrCOptionTy)
        //     {
        //         throw new Exception(result.err.message);
        //     }

        //     // can be None - nullable
        //     if (result.ok.tag == dojo.COptionTy_Tag.NoneTy)
        //     {
        //         return null;
        //     }

        //     // we instantiate a new managed Ty object
        //     // which will free the underlying c ty when it is garbage collected
        //     return new Ty(result.ok._some.);
        // }

        public List<Entity> Entities(dojo.Query query)
        {
            dojo.ResultCArrayEntity result = dojo.client_entities(client, &query);
            if (result.tag == dojo.ResultCArrayEntity_Tag.ErrCArrayEntity)
            {
                throw new Exception(result.err.message);
            }

            var entities = new List<Entity>();
            for (var i = 0; i < (int)result._ok.data_len; i++)
            {
                entities.Add(new Entity(result._ok.data[i]));
            }

            dojo.carray_free(result._ok.data, result._ok.data_len);
            return entities;
        }

        public ReadOnlySpan<dojo.KeysClause> SubscribedModels()
        {
            dojo.CArrayKeysClause models = dojo.client_subscribed_models(client);
            // NOTE: we could copy the data into a managed array
            // and free the c array from rust.
            // however, it is slower
            // dojo.EntityQuery[] arr = new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len).ToArray();
            // dojo.carray_free(entities);

            // this just returns a span of the carray data
            // freeing the c array is up to the caller
            // dojo.carray_free(entities);
            var arr = new Span<dojo.KeysClause>(models.data, (int)models.data_len).ToArray();
            dojo.carray_free(models.data, models.data_len);
            return arr;
        }

        public void AddModelsToSync(dojo.KeysClause[] models)
        {
            dojo.KeysClause* modelsPtr;

            fixed (dojo.KeysClause* ptr = &models[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_add_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void RemoveModelsToSync(dojo.KeysClause[] models)
        {
            dojo.KeysClause* modelsPtr;

            fixed (dojo.KeysClause* ptr = &models[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_remove_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void RegisterSyncModelUpdateEvent(dojo.KeysClause model, bool dispatchToMainThread = true)
        {
            onSyncModelUpdate = () =>
            {
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.SyncModelUpdated());
                }
                else
                {
                    ToriiEvents.Instance.SyncModelUpdated();
                }
            };

            dojo.Resultbool res = dojo.client_on_sync_model_update(client, model, new dojo.FnPtr_Void(onSyncModelUpdate));
            if (res.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(res.err.message);
            }
        }

        private void RegisterEntityStateUpdateEvent(dojo.FieldElement[] entities, bool dispatchToMainThread = true)
        {
            dojo.FieldElement* entitiesPtr;

            fixed (dojo.FieldElement* ptr = entities)
            {
                entitiesPtr = ptr;
            }

            onEntityStateUpdate = (key, models) =>
            {
                var mappedModels = new Model[(int)models.data_len];
                for (var i = 0; i < (int)models.data_len; i++)
                {
                    mappedModels[i] = new Model(models.data[i]);
                    // cleanup model
                    // dojo.model_free(&models.data[i]);
                }

                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EntityUpdated(new FieldElement(key), mappedModels));
                }
                else
                {
                    ToriiEvents.Instance.EntityUpdated(new FieldElement(key), mappedModels);
                }

                // cleanup
                dojo.carray_free(models.data, models.data_len);
                // TODO: free field element
            };


            // dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate callbackHandler = HandleEntityStateUpdate;
            dojo.Resultbool res = dojo.client_on_entity_state_update(client, entitiesPtr, (nuint)entities.Length, new dojo.FnPtr_FieldElement_CArrayModel_Void(onEntityStateUpdate));
            if (res.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(res.err.message);
            }
        }
        private void RegisterOnMessageEvent(bool dispatchToMainThread = true)
        {
            onMessage = (CString propagationSource, CString source, CString messageId, CString topic, dojo.CArrayu8 data) =>
            {
                Action propagateAndClean = () =>
                {
                    ToriiEvents.Instance.Message(propagationSource.ToString(), source.ToString(), messageId.ToString(), topic.ToString(), new Span<byte>(data.data, (int)data.data_len).ToArray());

                    // this is where cleanup needs to happen.
                    dojo.string_free(propagationSource);
                    dojo.string_free(source);
                    dojo.string_free(messageId);
                    dojo.string_free(topic);
                    dojo.carray_free(data.data, data.data_len);
                };

                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(propagateAndClean);
                }
                else
                {
                    propagateAndClean();
                }

                // NOTE: can't do cleanup here. as data will be dispatched to main thread and maybe used after free..
            };

            dojo.Resultbool res = dojo.client_on_message(client, new dojo.FnPtr_CString_CString_CString_CString_CArrayu8_Void(onMessage));
            if (res.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(res.err.message);
            }
        }

        public bool SubscribeTopic(string topic)
        {
            var result = dojo.client_subscribe_topic(client, CString.FromString(topic));
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }

        public bool UnsubscribeTopic(string topic)
        {
            var result = dojo.client_unsubscribe_topic(client, CString.FromString(topic));
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }

        public Span<byte> PublishMessage(string topic, Span<byte> data)
        {
            var array = new dojo.CArrayu8 { };

            fixed (byte* ptr = data)
            {
                array.data = ptr;
                array.data_len = (nuint)data.Length;
            }

            var result = dojo.client_publish_message(client, CString.FromString(topic), array);
            if (result.tag == dojo.ResultCArrayu8_Tag.ErrCArrayu8)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }
    }
}