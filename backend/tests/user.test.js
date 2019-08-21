const UserBl = require("../src/business/user-bl");

const {executeInTest, knex}  = require("../src/data");

afterAll(() => {
  knex.destroy();
});

test("Should social sign in a user", async () => {
  await executeInTest(async trx => {
    const userBl = new UserBl(trx);
    const result = await userBl.socialSignIn("daniel@test.com");

    expect(result.token).not.toBeUndefined();
    expect(result.user).not.toBeUndefined();
  });
});

test("Should sign out", async () => {
  await executeInTest(async trx => {
    const userBl = new UserBl(trx);
  
    const userBeforeSignIn = await userBl.findByEmail("daniel@test.com");
    const tokensBeforeSignIn = userBeforeSignIn.tokens.split(",");
 
    const result = await userBl.signIn( "daniel@test.com");

    const userAfterSignIn = await userBl.findByEmail("daniel@test.com");
    const tokensAfterSignIn = userAfterSignIn.tokens.split(",");
   
    expect(tokensAfterSignIn.length - tokensBeforeSignIn.length).toEqual(1);

    await userBl.signOut(result.user, result.token);
    const userAfterSignOut = await userBl.findByEmail("daniel@test.com");

    const tokensAfterSignOut = userAfterSignOut.tokens.split(",");
    expect(tokensBeforeSignIn.sort()).toEqual(tokensAfterSignOut .sort());
   
  });
});

test("Should sign up a new user", async () => {
  await executeInTest(async trx => {
    const user = {
      firstName: "Andrew",
      lastName:"Steve",
      email: "andrew@example.com",
      picture: "http://example.com/1234.jpg",
      phone: "4034567823"
    };

    const userBl = new UserBl(trx);

    const result = await userBl.socialSignUp(user);

    expect(result.token).not.toBeUndefined();
    expect(result.user).not.toBeUndefined();

    let found = await userBl.findByEmail("andrew@example.com");

    expect(found).not.toBeUndefined();
  });
});
