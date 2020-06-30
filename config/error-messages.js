const signinMessages = {
  ok: 'Successfully logged in.',
  wrongPass: 'Incorrect password.',
  notExist: 'User not exist. You can register it yourself!'
};

const signupMessages = {
  ok: 'Successfully register.',
  alreadyExist: 'User with this name already exst.',
  fault: 'Something went wrong. Please, try again in a few minutes.'
};

const accessMessages = {
  notAccess: 'You do not authenticated to view or read this content.',
  notMember: 'Only members can access to view or read this content.',
  notAdmin: 'Only admins can access to view or read this content.'
};

function getSigninMessage(res) {
  switch (res) {
    case null: {
      return signinMessages.notExist;
    }
    case false: {
      return signinMessages.wrongPass;
    }
    default: {
      return signinMessages.ok;
    }
  }
}

function getSignupMessage(res) {
  switch (res) {
    case null: {
      return signupMessages.fault;
    }
    case false: {
      return signupMessages.alreadyExist;
    }
    default: {
      return signupMessages.ok;
    }
  }
}

module.exports = {
  getSigninMessage,
  accessMessages,
  getSignupMessage
};
