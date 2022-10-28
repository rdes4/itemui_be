import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Item = db.define('item', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
})

export default Item;

(async()=>{
    await db.sync();
})();