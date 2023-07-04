import {Request, Response} from 'express';
import User from "../models/user";
export const getUsers = async ( req: Request, res: Response ) => {
    const users = await User.findAll();
    res.json({
        users
    });
}

export const getUser = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }

    res.json({
        user
    });
}

export const createUser = async ( req: Request, res: Response ) => {
    const {body} = req;

    try {
        const emailExists = await User.findOne({
            where: { email: body.email }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: `User with email ${body.email} already exists`
            });
        }

        const user = await User.create(body);

        res.json({user});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

export const updateUser = async ( req: Request, res: Response ) => {
    const {id} = req.params;
    const {body} = req;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `User with id ${id} not exists`
            });
        }
        await user.update(body)

        res.json({user});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

export const deleteUser = async ( req: Request, res: Response ) => {
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `User with id ${id} not exists`
            });
        }
        await user.update( {status: false} );

        res.json({user});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}