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
    let resultArray = [];

    for (let month = 1; month <= 12; month++) {
        const gte = new Date(currentYear, month - 1, 1); 
        const lte = new Date(currentYear, month, 0);    

        const orders = await prisma.order.count({
            where: {
                createdAt: {
                    gte,
                    lte
                },
            },
        });

        const users = await prisma.user.count({
            where: {
                createdAt: {
                    gte,
                    lte
                },
            },
        });

        const products = await prisma.product.count({
            where: {
                createdAt: {
                    gte,
                    lte
                },
            },
        });

        const comments = await prisma.comment.count({
            where: {
                createdAt: {
                    gte,
                    lte
                },
            },
        });

        const categories = await prisma.category.count({
            where: {
                createdAt: {
                    gte,
                    lte
                },
            },
        });


        resultArray.push({
            month: month,
            orders,
            users,
            products,
            comments,
            categories
        });
    }

    return resultArray;
};
