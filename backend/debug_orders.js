const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Fetching orders...");
        const orders = await prisma.order.findMany({
            include: { user: true, items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        console.log("Orders fetched successfully:", JSON.stringify(orders, null, 2));
    } catch (error) {
        console.error("Error fetching orders:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
