const userAccount = {
  id: 1,
  userName: "John Smith",
  balance: 7503492.18,
};

const userFunds = [
  {
    userId: 1,
    fundType: "DOMESTIC_STOCK",
    balance: 10762.46,
  },
  {
    userId: 1,
    fundType: "FOREIGH_STOCK",
    balance: 65324.55,
  },
];

const getUserAccount = () => userAccount;
const getUserFunds = () => userFunds;

module.exports = {
  getUserAccount,
  getUserFunds,
};
