using UnityEngine;

public class BezierLine : MonoBehaviour
{
    public Transform targetObject;
    public float lineLength = 1f;
    public float lineSize = 0.1f;
    public int numPoints = 50;

    private LineRenderer lineRenderer;
    private Vector3[] positions;

    void Start()
    {
        lineRenderer = GetComponent<LineRenderer>();
        lineRenderer.positionCount = numPoints;
        positions = new Vector3[numPoints];
    }

    void Update()
    {
        Vector3 targetPosition = targetObject.position;
        Vector3 direction = (targetPosition - transform.position).normalized;

        for (int i = 0; i < numPoints; i++)
        {
            float t = i / (float)(numPoints - 1);
            Vector3 point = CalculateBezierPoint(transform.position, transform.position + direction * lineLength, targetPosition, t);
            positions[i] = point;
            lineRenderer.SetPosition(i, point);
        }

        lineRenderer.startWidth = lineSize;
        lineRenderer.endWidth = lineSize;
    }

    Vector3 CalculateBezierPoint(Vector3 p0, Vector3 p1, Vector3 p2, float t)
    {
        float u = 1 - t;
        float tt = t * t;
        float uu = u * u;
        float uuu = uu * u;
        float ttt = tt * t;

        Vector3 point = uuu * p0;
        point += 3 * uu * t * p1;
        point += 3 * u * tt * p2;
        point += ttt * targetObject.position;

        return point;
    }
}