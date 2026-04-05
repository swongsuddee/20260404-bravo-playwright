import fs from "fs";
import { RowDataPacket } from "mysql2";
import path from "path";
import { pool } from "./connect-mysql";

type UserRow = RowDataPacket & {
    id: number;
    email: string;
    password: string;
    full_name: string;
};

export async function getUsers(): Promise<UserRow[]> {
    const queryStr = fs.readFileSync(
        path.join(__dirname, "./select-user.sql"), "utf8"
    );
    const [rows] = await pool.execute<UserRow[]>(queryStr);
    return rows;
}

export async function addUser(email: string, password: string, fullName: string): Promise<UserRow[]> {
    const queryStr = fs.readFileSync(
        path.join(__dirname, "./insert-new-user.sql"), "utf8"
    );
    const [result] = await pool.execute<UserRow[]>(queryStr, [email, password, fullName]);
    return result;
}

export async function deleteUser(id: number): Promise<UserRow[]> {
    const queryStr = fs.readFileSync(
        path.join(__dirname, "./delete-user.sql"), "utf8"
    );
    const [result] = await pool.execute<UserRow[]>(queryStr, [id]);
    return result;
}