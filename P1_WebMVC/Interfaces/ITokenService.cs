using System;

namespace P1WebMVC.Interfaces;

public interface ITokenService
{


    public string CreateToken(Guid userId, string email, string username, int expiryTime);

    public string CreateToken(Guid userId, string email, string username);

    public Guid VerifyTokenAndGetId(string token);

    public bool VerifyToken(string token);

}
