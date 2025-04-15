import type { IItem } from "@/models/item.model";
import type { Request, Response } from "express";
import { z } from "zod";
import { ItemRepository } from "../repository/item.repository";

const itemRepository = new ItemRepository();

// Zod schema for item creation
const createItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  category: z.enum(["CLEANING", "MAINTENANCE"], "Invalid category"),
  image: z.string().url("Invalid image URL"),
  materials: z.array(z.string().length(24, "Each material ID must be a valid ObjectId")).optional(),
});

// Zod schema for item update
const updateItemSchema = z.object({
  name: z.string().optional(),
  category: z.enum(["CLEANING", "MAINTENANCE"]).optional(),
  image: z.string().url().optional(),
  materials: z.array(z.string().length(24, "Each material ID must be a valid ObjectId")).optional(),
});

// Controller: Create an item
export const createItem = async (req: Request, res: Response) => {
  try {
    const validatedData = createItemSchema.parse(req.body) as IItem;
    const newItem = await itemRepository.createItem(validatedData);
    return res.status(201).json(newItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Update an item
export const updateItem = async (req: Request, res: Response) => {
  try {
    const validatedData = updateItemSchema.parse(req.body) as IItem;
    const updatedItem = await itemRepository.updateItem(req.params.id, validatedData);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json(updatedItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get all items
export const getAllItems = async (_req: Request, res: Response) => {
  try {
    const items = await itemRepository.getAllItems();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get items by category
export const getItemsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    if (!["CLEANING", "MAINTENANCE"].includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const items = await itemRepository.getAllItemsByCategory(category as "CLEANING" | "MAINTENANCE");
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get item by ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await itemRepository.findItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Delete an item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await itemRepository.deleteItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get paginated items
export const getPaginatedItems = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1;
    const limit = Number.parseInt(req.query.limit as string) || 10;
    const { items, total } = await itemRepository.getPaginatedItems(page, limit);

    return res.status(200).json({ items, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoriesWithItems = async (req: Request, res: Response) => {
  try {
    const categories = [
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Maintenance",
        category: "MAINTENANCE",
        subCategory: "MAINTENANCE",
        description:
          "The maintenance of floors, windows, electronic equipment, air conditioning and appliances should be done preventively. If we do it on a regular basis, we will guarantee not only better operation but a longer useful life.",
        image: `https://${req.get("host")}/assets/maintenance.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Deep Cleaning",
        category: "CLEANING",
        subCategory: "DEEP CLEANING",
        description:
          "Deep cleaning is something we many times take for granted, since we only focus on daily cleaning. However, it is very important to keep in mind that many areas of our home are not cleaned on a regular basis, and this is why after a certain time the appearance of certain areas of the house starts to look damaged.",
        image: `https://${req.get("host")}/assets/cleaning.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Living Room",
        category: "CLEANING",
        subCategory: "LIVING ROOM",
        description:
          "The furniture that we use daily in our living area must be cared for in very specific ways and at very precise times. Only in this way can you guarantee that it is in perfect condition and that the different materials are conserved in an ideal manner.",
        image: `https://${req.get("host")}/assets/living.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Dinning Room",
        category: "CLEANING",
        subCategory: "DINNING ROOM",
        description:
          "The dining area is used daily, and its deterioration is always greater than other spaces in the house since we serve food in it. Therefore, it is a place requiring special care, which we often attend to only when it is too late. Cleaning and maintenance in this area require great attention.",
        image: `https://${req.get("host")}/assets/dinning.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Hallway",
        category: "CLEANING",
        subCategory: "HALLWAY",
        description:
          "The hallways or access corridors to the most private areas of our house are normally overlooked in deep cleaning. This transit area has high traffic, so it must be cared for periodically.",
        image: `https://${req.get("host")}/assets/hallway.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Family Room",
        category: "CLEANING",
        subCategory: "FAMILY ROOM",
        description:
          "THE FAMILY ROOM IS AN AREA OF HIGH TRAFFIC AND HOME USE, WHERE YOU SPEND LONG PERIODS OF TIME IN VARIOUS ACTIVITIES, THIS AREA SUFFERS GREATER DAMAGES SINCE IT IS ALMOST ALWAYS DESIGNED FOR EVERYDAY LIFE WITHOUT MAJOR RESTRICTIONS. THE CARE WE GIVE TO THIS AREA WILL ENSURE THAT IT NEVER LOOKS DAMAGED COMPARED TO THE REST OF OUR HOME.",
        image: `https://${req.get("host")}/assets/family-room.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Bedroom",
        category: "CLEANING",
        subCategory: "BED ROOM",
        description:
          "BEDROOMS ARE SPACES DESIGNED FOR REST AND THEREFORE THEY MUST BE CLEAN AND ORGANIZED TO PROVIDE THAT THE BODY HAS A RESTORABLE AND HEALTHY SLEEP. THE DEEP CLEANING TIMES IN THIS AREA ARE VERY IMPORTANT SINCE WE REMAIN IN IT FOR LONG PERIODS OF TIME EVERY NIGHT.",
        image: `https://${req.get("host")}/assets/bed-room.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Bathroom",
        category: "CLEANING",
        subCategory: "BATHROOM",
        description:
          "BATHROOMS ARE CLEANING AREAS THAT MANY THINK THAT BECAUSE THEY ARE CLEANED DAILY THEY SHOULD NOT BE DONE IN A DEEPER WAY. IN THESE AREAS WE SHOULD TAKE GREATER CARE SINCE THEY ARE AREAS WHERE BACTERIA AND OTHER GERMES INVISIBLE TO OUR EYES ARE PRESENT.",
        image: `https://${req.get("host")}/assets/bathroom.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "Kitchen",
        category: "CLEANING",
        subCategory: "KITCHEN",
        description:
          "THE KITCHEN IS A COMPLEX AREA, FULL OF LARGE AND SMALL APPLIANCES BUT IT IS ALSO THE PLACE WHERE WE PREPARE OUR DAILY FOOD. THIS AREA, DUE TO ITS HIGH TRAFFIC AND VARIETY OF MATERIALS AND PRODUCTS, CAN BE OVERWHELMING WHEN IT IS DEEP CLEANING. IT IS VITAL TO ESTABLISH A CARE ROUTINE IN THIS AREA OF THE HOME SO THAT IT LOOKS AND FUNCTIONS PROPERLY.",
        image: `https://${req.get("host")}/assets/kitchen.png`,
      },
      {
        id: Math.random().toString(36).substring(2, 15),
        name: "OTHER SPACES",
        category: "CLEANING",
        subCategory: "OTHER SPACES",
        description:
          "EVERY HOME IS A WORLD, EVERY HOME HAS DIFFERENT AREAS AND SPACES. ATTENDING EVERY CORNER OF YOUR HOME IS A PRIORITY. AREAS SUCH AS BALCONIES, OUTDOOR AREAS OR EQUIPMENT ROOMS OR WORK AREA, ARE MANY TIMES LEFT FOR LAST IN THE TO-DO LIST. HERE WE SHOW YOU THAT EACH AREA SHOULD BE CARED FOR EQUALLY, TO GUARANTEE A COMPREHENSIVE, CAREFUL HOME WITH LITTLE DETERIORATION.",
        image: `https://${req.get("host")}/assets/kitchen.png`,
      },
    ];
    const toReturn = [];
    let items = await itemRepository.getAllItems();
    for (const category of categories) {
      if (items.length > 0) {
        const itemsToPush = items.filter((item) =>
          item.subCategory ? category.subCategory === item.subCategory : category.category === item.category,
        );
        itemsToPush.sort((a, b) => a.order - b.order);
        toReturn.push({
          ...category,
          items: itemsToPush.map((item) => ({
            id: item._id,
            name: item.name,
            category: item.category,
            subCategory: item.subCategory,
            image: `https://${req.get("host")}/assets/${item.image}`,
            materials: item.materials,
            order: item.order,
          })),
        });
        items = items.filter((item, index) => !itemsToPush.map((x) => x._id).includes(item._id));
      }
    }

    return res.status(200).json(toReturn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
