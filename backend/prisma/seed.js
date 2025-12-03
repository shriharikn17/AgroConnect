const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create Categories
    const pesticide = await prisma.category.upsert({
        where: { name: 'Pesticides' },
        update: {},
        create: { name: 'Pesticides' },
    });

    const fertilizer = await prisma.category.upsert({
        where: { name: 'Fertilizers' },
        update: {},
        create: { name: 'Fertilizers' },
    });

    const seeds = await prisma.category.upsert({
        where: { name: 'Seeds' },
        update: {},
        create: { name: 'Seeds' },
    });

    // Clear existing data
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});

    // Products Data


    // Real Product Data
    const realProducts = [
        // Bayer Products
        { name: "Confidor", description: "Imidacloprid 17.8% SL. Systemic insecticide for sucking pests.", price: 450, stock: 100, brand: "Bayer", size: "100ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Regent", description: "Fipronil 5% SC. Broad spectrum insecticide.", price: 600, stock: 50, brand: "Bayer", size: "250ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Oberon", description: "Spiromesifen 22.9% SC. Insecticide and acaricide.", price: 950, stock: 40, brand: "Bayer", size: "100ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Nativo", description: "Tebuconazole + Trifloxystrobin. Systemic fungicide.", price: 1200, stock: 60, brand: "Bayer", size: "100g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Solomon", description: "Beta-Cyfluthrin + Imidacloprid. Systemic insecticide.", price: 850, stock: 80, brand: "Bayer", size: "100ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Fame", description: "Flubendiamide 480 SC. Control of bollworms.", price: 1500, stock: 30, brand: "Bayer", size: "50ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Roundup", description: "Glyphosate 41% SL. Non-selective herbicide.", price: 350, stock: 150, brand: "Bayer", size: "1L", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Council Activ", description: "Herbicide for paddy.", price: 1100, stock: 45, brand: "Bayer", size: "90g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },

        // Syngenta Products
        { name: "Amistar Top", description: "Azoxystrobin + Difenoconazole. Broad spectrum fungicide.", price: 1200, stock: 40, brand: "Syngenta", size: "200ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Curacron", description: "Profenofos 50% EC. Control of caterpillars and mites.", price: 850, stock: 60, brand: "Syngenta", size: "500ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Virtako", description: "Chlorantraniliprole + Thiamethoxam. Granular insecticide.", price: 1400, stock: 25, brand: "Syngenta", size: "1kg", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Score", description: "Difenoconazole 25% EC. Systemic fungicide.", price: 900, stock: 55, brand: "Syngenta", size: "250ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Chess", description: "Pymetrozine 50% WG. For sucking pests.", price: 1600, stock: 35, brand: "Syngenta", size: "250g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Ridomil Gold", description: "Metalaxyl + Mancozeb. Fungicide for downy mildew.", price: 750, stock: 70, brand: "Syngenta", size: "500g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Alika", description: "Thiamethoxam + Lambda-cyhalothrin. Broad spectrum.", price: 650, stock: 90, brand: "Syngenta", size: "80ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },

        // FMC Products
        { name: "Coragen", description: "Chlorantraniliprole 18.5% SC. Long duration control.", price: 1800, stock: 30, brand: "FMC", size: "60ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Marshal", description: "Carbosulfan 25% EC. Insecticide.", price: 550, stock: 100, brand: "FMC", size: "500ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Benevia", description: "Cyantraniliprole. Cross-spectrum insecticide.", price: 2100, stock: 20, brand: "FMC", size: "180ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },

        // Fertilizers (IFFCO, IPL, Mahadhan)
        { name: "DAP", description: "Di-Ammonium Phosphate. Essential fertilizer.", price: 1350, stock: 200, brand: "IFFCO", size: "50kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "Urea", description: "Nitrogen rich fertilizer.", price: 270, stock: 500, brand: "IFFCO", size: "45kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "NPK 10:26:26", description: "Complex fertilizer.", price: 1450, stock: 150, brand: "IFFCO", size: "50kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "MOP", description: "Muriate of Potash.", price: 1700, stock: 100, brand: "IPL", size: "50kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "Sulphate of Potash", description: "Potassium rich.", price: 2200, stock: 80, brand: "IPL", size: "25kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "19:19:19", description: "Water soluble NPK fertilizer.", price: 150, stock: 80, brand: "Mahadhan", size: "1kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "0:52:34", description: "Mono Potassium Phosphate.", price: 200, stock: 60, brand: "Mahadhan", size: "1kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "13:0:45", description: "Potassium Nitrate.", price: 180, stock: 75, brand: "Mahadhan", size: "1kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },
        { name: "Calcium Nitrate", description: "Water soluble calcium.", price: 120, stock: 90, brand: "Mahadhan", size: "1kg", categoryId: fertilizer.id, imageUrl: "/products/fertilizer.png" },

        // Seeds
        { name: "Cotton Seeds RCH 659", description: "High yield hybrid cotton seeds.", price: 800, stock: 50, brand: "Nuziveedu", size: "450g", categoryId: seeds.id, imageUrl: "/products/seeds.png" },
        { name: "Bhakti Cotton", description: "Bollworm resistant.", price: 780, stock: 60, brand: "Nuziveedu", size: "450g", categoryId: seeds.id, imageUrl: "/products/seeds.png" },
        { name: "Tomato Seeds Abhinav", description: "Hybrid tomato seeds suitable for all seasons.", price: 450, stock: 100, brand: "Syngenta", size: "10g", categoryId: seeds.id, imageUrl: "/products/seeds.png" },
        { name: "Chilli Seeds Saaho", description: "High pungency chilli seeds.", price: 650, stock: 80, brand: "Syngenta", size: "10g", categoryId: seeds.id, imageUrl: "/products/seeds.png" },
        { name: "Okra Seeds Radhika", description: "High yielding okra.", price: 350, stock: 120, brand: "Advanta", size: "100g", categoryId: seeds.id, imageUrl: "/products/seeds.png" },
        { name: "Maize Seeds 900M", description: "High yield maize.", price: 1200, stock: 40, brand: "Monsanto", size: "4kg", categoryId: seeds.id, imageUrl: "/products/seeds.png" },

        // More Pesticides to fill up
        { name: "Delegate", description: "Spinetoram 11.7% SC.", price: 1900, stock: 25, brand: "Corteva", size: "100ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Tracer", description: "Spinosad 45% SC.", price: 1600, stock: 30, brand: "Corteva", size: "75ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Ulala", description: "Flonicamid 50% WG.", price: 800, stock: 50, brand: "UPL", size: "150g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Saaf", description: "Carbendazim + Mancozeb.", price: 400, stock: 100, brand: "UPL", size: "500g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Lancer Gold", description: "Acephate + Imidacloprid.", price: 600, stock: 70, brand: "UPL", size: "500g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Custodia", description: "Azoxystrobin + Tebuconazole.", price: 1100, stock: 45, brand: "Adama", size: "250ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Agil", description: "Propaquizafop.", price: 950, stock: 55, brand: "Adama", size: "250ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Cabrio Top", description: "Metiram + Pyraclostrobin.", price: 1300, stock: 35, brand: "BASF", size: "600g", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Merivon", description: "Fluxapyroxad + Pyraclostrobin.", price: 2500, stock: 20, brand: "BASF", size: "80ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
        { name: "Priaxor", description: "Fluxapyroxad + Pyraclostrobin.", price: 2400, stock: 22, brand: "BASF", size: "120ml", categoryId: pesticide.id, imageUrl: "/products/pesticide.png" },
    ];

    // Combine original and real products
    const allProducts = [...realProducts];

    // Duplicate some to reach > 50 for pagination testing if needed
    for (let i = 1; i <= 30; i++) {
        allProducts.push({
            name: `Generic Pesticide ${i}`,
            description: "Standard pesticide for general use.",
            price: 200 + i * 10,
            stock: 100,
            brand: "Generic",
            size: "500ml",
            categoryId: pesticide.id,
            imageUrl: "/products/pesticide.png"
        });
    }

    // Assign Generic Images based on Category
    for (const p of allProducts) {
        if (p.categoryId === pesticide.id) {
            p.imageUrl = "/products/pesticide.png";
        } else if (p.categoryId === fertilizer.id) {
            p.imageUrl = "/products/fertilizer.png";
        } else if (p.categoryId === seeds.id) {
            p.imageUrl = "/products/seeds.png";
        }

        await prisma.product.create({
            data: p
        });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
