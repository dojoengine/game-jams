using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Vector2 = System.Numerics.Vector2;

public class testScroll : MonoBehaviour
{
    private RectTransform rect;
    // Start is called before the first frame update
    void Start()
    {
        rect = transform.GetComponent<RectTransform>();
        StartCoroutine(scroll());
    }

    IEnumerator scroll()
    {
        while (true)
        {
            transform.position += Vector3.up * 1f;
            yield return new WaitForSeconds(0.01f);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
