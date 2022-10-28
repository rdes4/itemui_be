import Item from "../models/ItemModel.js";
import path from "path"
import fs from "fs";

export const getItems = async (req, res) => {
    try {
        const response = await Item.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getItemById = async (req, res) => {
    try {
        const response = await Item.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveItem = async (req, res) => {
    if (req.files === null) {
        res.status(400).json({msg: "No Uploded Files"})
    }
    const name = req.body.name;
    const description = req.body.description;
    const category_id = req.body.category_id;

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpeg', '.jpg'];

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({
            msg: "Invalid Image Type"
        })
    }

    if (fileSize > 5000000) {
        return res.status(422).json({
            msg: "File is too big, Max 5MB"
        })
    }

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if (err) {
            res.status(500).json({
                msg: err.message
            })
        }
        try {
            const data = {
                name: name, 
                description: description,
                category_id: category_id,
                image: fileName,
                url: url
            }
            await Item.create({
                name: name, 
                description: description,
                category_id: category_id,
                image: fileName,
                url: url
            });
            res.status(201).json({
                msg: "Item added",
                data: data
            })
        } catch (error) {
            console.log(error.message)
        }
    })

}

export const updateItem = async (req, res) => {
    const item = await Item.findOne({
        where:{
            id: req.params.id
        }
    });
    if (!item) {
        return res.status(404).json({
            msg: "Data Not Found"
        })
    }

    let fileName = "";
    if (req.files === null) {
        fileName = item.image
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpeg', '.jpg'];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({
                msg: "Invalid Image Type"
            })
        }
    
        if (fileSize > 5000000) {
            return res.status(422).json({
                msg: "File is too big, Max 5MB"
            })
        }

        const filepath = `./public/images/${item.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if (err) {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    }

    const name = req.body.name;
    const description = req.body.description;
    const category_id = req.body.category_id;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Item.update({
                name: name, 
                description: description,
                category_id: category_id,
                image: fileName,
                url: url
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: "Item Updated"
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteItem = async (req, res) => {
    const item = await Item.findOne({
        where:{
            id: req.params.id
        }
    });
    if (!item) {
        return res.status(404).json({
            msg: "Data Not Found"
        })
    }
    try {
        const filepath = `./public/images/${item.image}`;
        fs.unlinkSync(filepath);
        await Item.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: "Data deleted"
        });
    } catch (error) {
        console.log(error.message);
    }
}