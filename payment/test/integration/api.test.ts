import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Deve processar um pagamento", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagosilvalima1@hotmail.com",
    amount: 200,
  };

  const response = await axios.post("http://localhost:4333/payment", input);
  const output = response.data;
  expect(output.transactionId).toBeDefined();
});

test("Deve processar um pagamento e obter a transação", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagosilvalima1@hotmail.com",
    amount: 200,
  };

  const response = await axios.post("http://localhost:4333/payment", input);
  const output = response.data;

  const responseGetTransaction = await axios.get(
    `http://localhost:4333/transactions/${output.transactionId}`
  );
  console.log(responseGetTransaction);
  const outputGetTransaction = responseGetTransaction.data;
  expect(outputGetTransaction.transactionId).toBe(output.transactionId);
  expect(outputGetTransaction.name).toBe(input.name);
  expect(outputGetTransaction.email).toBe(input.email);
  expect(outputGetTransaction.amount).toBe(input.amount);
});
