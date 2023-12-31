const router = require("express").Router();

const Contact = require("../models/ContactModel");
const ExcelJS = require("exceljs");

router.get("/contacts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search ? req.query.search + "*" : "";
    const searchSpecialties = req.query.searchSpecialties
      ? req.query.searchSpecialties
      : "";

    const searchStateBr = req.query.searchStateBr || "";

    let sort = req.query.sort || "rating";

    let cultivations = req.query.cultivations || "TODAS";

    const cultivationsOptions = [
      "ALGODÃO",
      "ARROZ",
      "BATATA",
      "CAFÉ",
      "CANA",
      "FEIJÃO",
      "FUMO",
      "HORTIFRUTI",
      "MANDIOCA",
      "MILHO",
      "SOJA",
      "TOMATE",
      "TRIGO",
      "OUTROS",
      "NI",
    ];
    cultivations === "TODAS"
      ? (cultivations = [...cultivationsOptions])
      : (cultivations = req.query.cultivations.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort.length > 0) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const contacts = await Contact.find({
      specialties: { $regex: searchSpecialties, $options: "i" },
      profession: { $regex: search, $options: "i" },
      state: { $regex: searchStateBr, $options: "i" },
    })
      .where("cultivations")
      .in([...cultivations])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Contact.countDocuments({
      cultivations:{$in:[...cultivations]},
      specialties: { $regex: searchSpecialties, $options: "i" },
      profession: { $regex: search, $options: "i" },
      state: { $regex: searchStateBr, $options: "i" },
    })
     ;

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      plantingCulture: cultivationsOptions,
      contacts,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
router.get("/allcontacts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;

    let sort = req.query.sort || "rating";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort.length > 0) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const contacts = await Contact.find()
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Contact.countDocuments();

    const response = {
      error: false,
      total,
      page: page + 1,
      contacts,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.get("/contacts/exports", async (req, res) => {
  try {
    // const page = parseInt(req.query.page) - 1 || 0;
    // const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search ? req.query.search + "*" : "";
    const searchSpecialties = req.query.searchSpecialties
      ? req.query.searchSpecialties + "*"
      : "";

    const searchStateBr = req.query.searchStateBr || "";
    const searchType = req.query.searchType || "";

    let sort = req.query.sort || "rating";

    let cultivations = req.query.cultivations || "TODAS";

    const cultivationsOptions = [
      "ALGODÃO",
      "ARROZ",
      "BATATA",
      "CAFÉ",
      "CANA",
      "FEIJÃO",
      "FUMO",
      "HORTIFRUTI",
      "MANDIOCA",
      "MILHO",
      "SOJA",
      "TOMATE",
      "TRIGO",
      "OUTROS",
      "NI",
    ];
    cultivations === "TODAS"
      ? (cultivations = [...cultivationsOptions])
      : (cultivations = req.query.cultivations.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort.length > 0) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const contacts = await Contact.find({
      business_segment: { $regex: searchSpecialties, $options: "i" },
      profession: { $regex: search, $options: "i" },
      state: { $regex: searchStateBr, $options: "i" },
      contact_type: { $regex: searchType, $options: "i" },
    });
    // .where("cultivations")
    // .in([...cultivations])
    // .sort(sortBy)
    // .skip(page * limit)
    // .limit(limit);

    const total = await Contact.countDocuments({
      cultivations: { $in: [...cultivations] },
      specialties: { $regex: searchSpecialties, $options: "i" },
      profession: { $regex: search, $options: "i" },
      state: { $regex: searchStateBr, $options: "i" },
      contact_type: { $regex: searchType, $options: "i" },
    });

    const response = {
      error: false,
      total,
      // page: page + 1,
      // limit,
      plantingCulture: cultivationsOptions,
      contacts,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
//ATUALIZAR O field 'cultivations' que no MongoDB(importado do Mysql) está como planting_culture
router.get("/contactsUp", async (req, res) => {
  try {
    const contacts = await Contact.find();

    contacts.forEach(async (contact) => {
      // // Transformar a string em um array de strings (aqui, estamos dividindo por vírgulas)
      const arrayDeStrings = contact.planting_culture.split("/");

      // // Atualizar o documento na coleção
      await Contact.updateOne(
        { _id: contact._id },
        { $set: { cultivations: arrayDeStrings } }
      );
    });

    res.status(200).json("Atualizado com sucesso. Confere lá!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
