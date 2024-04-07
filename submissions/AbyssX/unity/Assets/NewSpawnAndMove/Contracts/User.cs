
// 定义 ContractAddress 类型（在 C# 中通常会用 Guid 或者 string 表示地址）

using System;

public struct ContractAddress
{
    // 这里假设使用 string 类型表示合约地址
    public string Address { get; set; }
}

// 将 User 构造为一个带有属性的结构体，并实现序列化接口（C# 中可使用 Newtonsoft.Json 或 System.Text.Json 等库实现）
[Serializable]
public struct User
{
    public ContractAddress Player { get; set; }

    public UserState State { get; set; }

    public uint Score { get; set; }
}

// 定义枚举类型 UserState
public enum UserState
{
    None = 0,
    Free = 1,
    StageBegin = 2,
    StageEnd = 3
}

// 实现 UserState 到 u32 的转换扩展方法
public static class UserStateExtensions
{
    public static uint ToUInt32(this UserState userState)
    {
        return (uint)userState;
    }
}
