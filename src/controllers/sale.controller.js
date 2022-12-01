import Sale from "../models/Sale.js";

// registrar una nueva venta
export const loadSale = async (req, res) => {
  // se crea nuevo registro de venta
  const {
    tipoAgente,
    procesadaPor,
    fechaCheckIn,
    fechaCheckOut,
    hotelSelector,
    AB_Hotel,
    rewardAB,
    rewardElite,
    validacionAB,
    validacionElite,
    nightsQuantity,
    reserveAmount,
    famTripChance,
    catHabitacion,
    codigoReserva,
    validacion,
    firstName,
    lastName,
    identityNumber,
    userID,
    correctionTextAB,
    correctionTextElite,
  } = req.body;

  const newSale = new Sale({
    tipoAgente: tipoAgente,
    procesadaPor: procesadaPor,
    fechaCheckIn: fechaCheckIn,
    fechaCheckOut: fechaCheckOut,
    hotelSelector: hotelSelector,
    AB_Hotel: AB_Hotel,
    rewardAB: rewardAB,
    rewardElite: rewardElite,
    validacionAB: validacionAB,
    validacionElite: validacionElite,
    nightsQuantity: nightsQuantity,
    reserveAmount: reserveAmount,
    famTripChance: famTripChance,
    catHabitacion: catHabitacion,
    codigoReserva: codigoReserva,
    validacion: validacion,
    firstName: firstName,
    lastName: lastName,
    identityNumber: identityNumber,
    userID: userID,
    correctionTextAB: correctionTextAB,
    correctionTextElite: correctionTextElite,
  });

  const saleLoaded = await newSale.save();

  res.status(201).json(saleLoaded);
};

// ver todas las reservas
export const getAllSales = async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
};

// ver todas las reservas de A&BTA
export const getAllSalesAB = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.rewardAB !== "None";
  });
  res.json(filtered);
};

// ver reservas de A&BTA pendientes
export const getAllSalesABpending = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.rewardElite === "None" && sale.rewardAB !== "None" && sale.validacionAB === "Pendiente";
  });
  res.json(filtered);
};

// ver reservas de A&BTA aprobadas
export const getAllSalesABapproved = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.rewardAB !== "None" && sale.validacionAB == "Aprobada";
  });
  res.json(filtered);
};

export const getSalesABHistory = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.validacionAB !== "None";
  });
  res.json(filtered);
};

// ver todas las reservas de Elite
export const getAllSalesElite = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.rewardElite !== "None";
  });
  res.json(filtered);
};

// ver reservas de A&BTA pendientes
export const getAllSalesElitePending = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.hotelSelector !== "A&B Tourism Authority" && sale.validacionElite === "Pendiente";
  });
  res.json(filtered);
};

// ver reservas de A&BTA aprobadas
export const getAllSalesEliteApproved = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.rewardElite !== "None" && sale.validacionElite == "Aprobada";
  });
  res.json(filtered);
};

export const getSalesEliteHistory = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.validacionElite !== "None";
  });
  res.json(filtered);
}

// ver todas las por ID de usuario
export const getSalesByUserId = async (req, res) => {
  const sales = await Sale.find();

  const filter = sales.filter(function (sale) {
    return sale.userID === req.params.userID;
  });

  res.json(filter);
};

// ver reservas cargadas en estado pendiente
export const getSalesFilteredPending = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.validacionAB === "Pendiente" || sale.validacionElite === "Pendiente";
  });
  res.json(filtered);
};

// ver reservas cargadas en estado aprobado
export const getSalesFilteredApproved = async (req, res) => {
  const sales = await Sale.find();
  const filtered = sales.filter(function (sale) {
    return sale.validacion === "Aprobada";
  });
  res.json(filtered);
};

// cambiar estado de aprovacion de reserva a aprobada
export const approveSale = async (req, res) => {
  const { saleId } = req.params;
  const updatedState = req.body;
  await Sale.findByIdAndUpdate(saleId, updatedState);
  res.status(200).json();
};

// cambiar estado de aprovacion de reserva a desaprobada
export const denySale = async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  const updatedState = req.body;
  await Sale.findByIdAndUpdate(sale, updatedState);
  res.status(200).json();
};

export const requestCorrection = async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  const updatedState = req.body;
  await Sale.findByIdAndUpdate(sale, updatedState);
  res.status(200).json();
};

// cargar texto de correccion
export const addCorrectionText = async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  const correctionText = req.body;
  await Sale.findByIdAndUpdate(sale, correctionText);
  res.status(200).json();
};

// editar habitacion
export const editHabitacion = async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  const catHabitacion = req.body;
  await Sale.findByIdAndUpdate(sale, catHabitacion);
  res.status(200).json();
};

// eliminar una reserva
export const deleteSaleById = async (req, res) => {
  const { saleId } = req.params;
  await Sale.findByIdAndDelete(saleId);
  res.status(200).json();
};
