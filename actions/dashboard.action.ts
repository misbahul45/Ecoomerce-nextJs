'use server'

import prisma from "@/lib/prisma"

export const getAllLength = async () => {
    const usersLength=await prisma.user.count()
    const productsLength=await prisma.product.count()
    const categoriesLength=await prisma.category.count()
    const comentsLength=await prisma.comment.count()
    const ordersLength=await prisma.order.count()
    const postersLength=await prisma.poster.count()
    return{
        usersLength,
        productsLength,
        categoriesLength,
        comentsLength,
        ordersLength,
        postersLength
    }
}

export const getAllValuesByMonth = async () => {
    const currentYear = new Date().getFullYear();

    const monthQueries = [];

    for (let month = 1; month <= 12; month++) {
        const gte = new Date(currentYear, month - 1, 1); // First day of the month
        const lte = new Date(currentYear, month, 0);     // Last day of the month
        
        monthQueries.push(
            (async () => {
                const orders = await prisma.order.count({
                    where: { createdAt: { gte, lte } },
                });
                const users = await prisma.user.count({
                    where: { createdAt: { gte, lte } },
                });
                const products = await prisma.product.count({
                    where: { createdAt: { gte, lte } },
                });
                const comments = await prisma.comment.count({
                    where: { createdAt: { gte, lte } },
                });
                const categories = await prisma.category.count({
                    where: { createdAt: { gte, lte } },
                });

                return {
                    month,
                    orders,
                    users,
                    products,
                    comments,
                    categories,
                };
            })()
        );
    }

    const data = await Promise.all(monthQueries);
    return data;
};

