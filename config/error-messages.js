const signinMessages = {
  ok: 'Successfully logged in.',
  wrongPass: 'Incorrect password.',
  notExist: 'User not exist. You can register it yourself!'
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

module.exports = {
  getSigninMessage,
  accessMessages
};
