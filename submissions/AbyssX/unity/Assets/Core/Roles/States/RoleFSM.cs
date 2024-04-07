using System;
using System.Collections.Generic;
using GameFramework;
using GameFramework.Fsm;

namespace Abyss.Core.States
{
    public class RoleFSM : IFsm<RoleBase>
    {
        public void Start<TState>() where TState : FsmState<RoleBase>
        {
            throw new NotImplementedException();
        }

        public void Start(Type stateType)
        {
            throw new NotImplementedException();
        }

        public bool HasState<TState>() where TState : FsmState<RoleBase>
        {
            throw new NotImplementedException();
        }

        public bool HasState(Type stateType)
        {
            throw new NotImplementedException();
        }

        public TState GetState<TState>() where TState : FsmState<RoleBase>
        {
            throw new NotImplementedException();
        }

        public FsmState<RoleBase> GetState(Type stateType)
        {
            throw new NotImplementedException();
        }

        public FsmState<RoleBase>[] GetAllStates()
        {
            throw new NotImplementedException();
        }

        public void GetAllStates(List<FsmState<RoleBase>> results)
        {
            throw new NotImplementedException();
        }

        public bool HasData(string name)
        {
            throw new NotImplementedException();
        }

        public TData GetData<TData>(string name) where TData : Variable
        {
            throw new NotImplementedException();
        }

        public Variable GetData(string name)
        {
            throw new NotImplementedException();
        }

        public void SetData<TData>(string name, TData data) where TData : Variable
        {
            throw new NotImplementedException();
        }

        public void SetData(string name, Variable data)
        {
            throw new NotImplementedException();
        }

        public bool RemoveData(string name)
        {
            throw new NotImplementedException();
        }

        public string Name { get; }
        public string FullName { get; }
        public RoleBase Owner { get; }
        public int FsmStateCount { get; }
        public bool IsRunning { get; }
        public bool IsDestroyed { get; }
        public FsmState<RoleBase> CurrentState { get; }
        public float CurrentStateTime { get; }
    }
}