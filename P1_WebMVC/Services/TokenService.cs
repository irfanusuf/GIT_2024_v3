using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using P1WebMVC.Interfaces;

namespace P1WebMVC.Services;

public class TokenService : ITokenService

{
    private readonly string secretKey;
    public TokenService(IConfiguration configuration)
    {
        this.secretKey = configuration["Jwt:secretKey"] ?? throw new ArgumentNullException(secretKey); ;
    }



    public string CreateToken(Guid userId, string email, string username, int expiryTime)
    {
        // instance of main class 
        var tokenHandler = new JwtSecurityTokenHandler();

        // encoding of the secret key AscII 
        var key = Encoding.ASCII.GetBytes(secretKey);

        // creation of payload 
        var payload = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
           [

                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, username)
           ]),

            Expires = DateTime.Now.AddDays(expiryTime),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(payload);

        return tokenHandler.WriteToken(token);
    }



    public string CreateToken(Guid userId, string email, string username)
    {
        // instance of main class 
        var tokenHandler = new JwtSecurityTokenHandler();

        // encoding of the secret key AscII 
        var key = Encoding.ASCII.GetBytes(secretKey);

        // creation of payload 
        var payload = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
           [

                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, username)
           ]),

            Expires = DateTime.Now.AddMinutes(5),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(payload);

        return tokenHandler.WriteToken(token);
    }



    public bool VerifyToken(string token)
    {

        // instance of main class 
        var tokenHandler = new JwtSecurityTokenHandler();

        // encoding of the secret key AscII 
        var key = Encoding.ASCII.GetBytes(secretKey);


        var validationParameters = new TokenValidationParameters
        {

            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };


        var validate = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

        if (validate == null)
        {
            return false;
        }
        else
        {
            return true;
        }


    }



    public Guid VerifyTokenAndGetId(string token)
    {

        try
        { // instance of main class 
            var tokenHandler = new JwtSecurityTokenHandler();

            // encoding of the secret key AscII 
            var key = Encoding.ASCII.GetBytes(secretKey);


            var validationParameters = new TokenValidationParameters
            {

                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            var validate = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

            var userId = validate.FindFirst(ClaimTypes.NameIdentifier);

            if (userId == null)
            {

                throw new Exception("user Id not found in the token");
            }
            else
            {
                return Guid.Parse(userId.Value);
            }

        }
        catch (System.Exception)
        {

            throw;
        }


    }
}
