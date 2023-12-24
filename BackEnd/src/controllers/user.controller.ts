import BaseController from "./base.controller";
import { Request, Response } from "express";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import Wallet from "../models/wallet.model";
import TransType from "../models/trans.type.model";
import TransCate from "../models/trans.cate.model";
import Transaction from "../models/transaction.model";
import UserServices from "../services/user.services";
import TransactionServices from "../services/transaction.services";
import WalletServices from "../services/wallet.services";

class UserController extends BaseController {

    async update(req: any, res: Response) {
        let id = req.user.id
        let arr = Object.keys(req.body)
        let image = arr[0].replace('upload/', 'upload%2F') + '=' + req.body[arr[0]] + '&' + arr[1] + '=' + req.body[arr[1]];
        await UserServices.updateUser(id, image)
        res.status(200).json({
            message: 'Update successfully!'
        })
    }
   
}

export default UserController;