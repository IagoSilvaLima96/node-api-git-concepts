import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Deve cadastrar passageiro", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagocrouchlima@gmail.com",
    document: "69309539038",
  };

  const { data } = await axios.post("http://localhost:5333/passengers", input);
  // console.log(data);
  expect(data.passengerId).toBeDefined();
});

test("Deve cadastrar motorista", async () => {
  const input = {
    name: "Taynah Lima",
    email: "taynahlima97@gmail.com",
    document: "85464428003",
    carPlate: "ABC1234",
  };

  const { data } = await axios.post("http://localhost:5333/drivers", input);
  expect(data.driverId).toBeDefined();
});

test("Nao deve cadastrar motorista com cpf invalido", async () => {
  const input = {
    name: "Taynah Lima",
    email: "taynahlima97@gmail.com",
    document: "85464428002",
    carPlate: "ABC1234",
  };

  const response = await axios.post("http://localhost:5333/drivers", input);
  expect(response.status).toBe(422);
  expect(response.data).toBe("CPF Invalido");
});

test("Nao deve cadastrar passageiro com cpf invalido", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagocrouchlima@gmail.com",
    document: "69309539037",
  };

  const response = await axios.post("http://localhost:5333/passengers", input);
  expect(response.status).toBe(422);
  expect(response.data).toBe("CPF Invalido");
});

test("Deve cadastrar e obter o passageiro", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagocrouchlima@gmail.com",
    document: "61032799331",
  };

  const { data } = await axios.post("http://localhost:5333/passengers", input);
  const { data: passenger } = await axios.get(
    `http://localhost:5333/passengers/${data.passengerId}`
  );
  console.log(data);
  expect(passenger.name).toBe(input.name);
  expect(passenger.email).toBe(input.email);
  expect(passenger.document).toBe(input.document);
});

test("Deve cadastrar e obter o motorista", async () => {
  const input = {
    name: "Taynah Lima",
    email: "taynahlima97@gmail.com",
    document: "85464428003",
    carPlate: "ABC1234",
  };
  const { data } = await axios.post("http://localhost:5333/drivers", input);
  const { data: driver } = await axios.get(
    `http://localhost:5333/drivers/${data.driverId}`
  );
  expect(driver.name).toBe(input.name);
  expect(driver.email).toBe(input.email);
  expect(driver.document).toBe(input.document);
  expect(driver.carPlate).toBe(input.carPlate);
});
