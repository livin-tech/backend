import type { Request } from "express";

export const getCategories = (req: Request) => [
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Maintenance",
    nameEN: "Maintenance",
    nameES: "Mantenimiento",
    category: "MAINTENANCE",
    categoryEn: "Maintenance",
    categoryEs: "Mantenimiento",
    subCategory: "MAINTENANCE",
    subCategoryEn: "Maintenance",
    subCategoryEs: "Mantenimiento",
    descriptionEN:
      "The maintenance of floors, windows, electronic equipment, air conditioning and appliances should be done preventively, if we do it on a regular basis, we will guarantee not only better operation but a longer useful life.",
    descriptionES:
      "El mantenimiento de pisos, ventanas, equipos electrónicos, aire acondicionado y electrodomésticos debe realizarse de manera preventiva, si lo hacemos de forma regular, garantizaremos no solo un mejor funcionamiento sino una vida útil más larga.",
    image: `https://${req.get("host")}/assets/maintenance.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Deep Cleaning",
    nameEN: "Deep Cleaning",
    nameES: "Limpieza Profunda",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "DEEP CLEANING",
    subCategoryEn: "Deep Cleaning",
    subCategoryEs: "Limpieza Profunda",
    descriptionEN:
      "Deep cleaning is something we take many times for granted, since we only focus on daily cleaning. However, it is very important to keep in mind that many areas of our home are not cleaned on a regular basis and this is why after a certain time the appearance of certain areas of the house start to look damaged.",
    descriptionES:
      "La limpieza profunda es algo que muchas veces damos por sentado, ya que solo nos enfocamos en la limpieza diaria. Sin embargo, es muy importante tener en cuenta que muchas áreas de nuestro hogar al no limpiarse de manera regular, después de cierto tiempo la apariencia de ciertas áreas de la casa comienzan a verse dañadas.",
    image: `https://${req.get("host")}/assets/cleaning.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Living Room",
    nameEN: "Living Room",
    nameES: "Sala de Estar",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "LIVING ROOM",
    subCategoryEn: "Living Room",
    subCategoryEs: "Sala de Estar",
    descriptionEN:
      "The furniture that we use daily in our living area must be cared for in very specific ways and at very precise times, only in this way you can guarantee that it is in perfect condition and that the different materials are conserved in an ideal manner.",
    descriptionES:
      "Los muebles que usamos diariamente en diferentes áreas, deben ser cuidados de maneras muy específicas y en momentos muy precisos, solo de esta manera puedes garantizar que estén en perfectas condiciones y que los diferentes materiales se conserven de una manera ideal.",
    image: `https://${req.get("host")}/assets/living.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Dining Room",
    nameEN: "Dining Room",
    nameES: "Comedor",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "DINING ROOM",
    subCategoryEn: "Dining Room",
    subCategoryEs: "Comedor",
    descriptionEN:
      "The dining area is used daily, and its deterioration is always greater than other spaces of the house since we serve food on it. Therefore it is a place that requires special care, which we often attend to only when it is too late. Cleaning and maintenance in this area requires great attention.",
    descriptionES:
      "El área del comedor se usa diariamente y su deterioro siempre es mayor que otros espacios de la casa, ya que servimos comida en él. Por lo tanto es un lugar que requiere cuidados especiales, a los que a menudo atendemos solo cuando es demasiado tarde. La limpieza y mantenimiento en esta área requieren gran atención.",
    image: `https://${req.get("host")}/assets/dinning.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Hallway",
    nameEN: "Hallway",
    nameES: "Pasillo",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "HALLWAY",
    subCategoryEn: "Hallway",
    subCategoryEs: "Pasillo",
    descriptionEN:
      "The hallways or access corridors to the most private areas of our house are normally overlooked in deep cleaning, and this transit area has high traffic, so it must be cared periodically.",
    descriptionES:
      "Los pasillos o corredores de acceso a las áreas más privadas de nuestra casa normalmente se pasan por alto en la limpieza profunda, y esta área de tránsito tiene alto tráfico, por lo que debe ser cuidada periódicamente.",
    image: `https://${req.get("host")}/assets/hallway.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Family Room",
    nameEN: "Family Room",
    nameES: "Sala Familiar",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "FAMILY ROOM",
    subCategoryEn: "Family Room",
    subCategoryEs: "Sala Familiar",
    descriptionEN:
      "The family room is an area of high traffic, where you spend long periods of time in various activities, this area suffers greater damage since it is almost always designed for everyday life without major restrictions. The care we give to this area will ensure that it never looks damaged compared to the rest of our home.",
    descriptionES:
      "La sala familiar es un área de alto tráfico y uso doméstico, donde pasas largos períodos de tiempo en diversas actividades, esta área sufre mayores daños ya que casi siempre está diseñada para la vida cotidiana sin mayores restricciones. El cuidado que le damos a esta área asegurará que nunca se vea dañada en comparación con el resto de nuestro hogar.",
    image: `https://${req.get("host")}/assets/family-room.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Bedrooms",
    nameEN: "Bedrooms",
    nameES: "Dormitorios",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "BEDROOM",
    subCategoryEn: "Bedroom",
    subCategoryEs: "Dormitorio",
    descriptionEN:
      "Bedrooms are spaces designed for rest and therefore they must be clean and organized so that the body has a restorable and healthy sleep. The deep cleaning times in this area are very important since we remain in it for long periods of time every night.",
    descriptionES:
      "Los dormitorios son espacios diseñados para el descanso y por lo tanto deben estar limpios y organizados para que el cuerpo tenga un sueño reparador y saludable. Los tiempos de limpieza profunda en esta área son muy importantes ya que permanecemos en ella por largos períodos de tiempo cada noche.",
    image: `https://${req.get("host")}/assets/bed-room.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Bathrooms",
    nameEN: "Bathrooms",
    nameES: "Baños",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "BATHROOM",
    subCategoryEn: "Bathroom",
    subCategoryEs: "Baño",
    descriptionEN:
      "Bathrooms are cleaning areas that many think that because they are cleaned daily they should not be done in a deeper way. In these areas we should take greater care because invisible bacteria and other germs to our eyes are constantly present.",
    descriptionES:
      "Los baños son áreas de limpieza que muchos piensan que porque se limpian diariamente no deben hacerse de manera más profunda. En estas áreas debemos tener mayor cuidado ya que son áreas donde están presentes bacterias y otros gérmenes invisibles a nuestros ojos.",
    image: `https://${req.get("host")}/assets/bathroom.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Kitchen",
    nameEN: "Kitchen",
    nameES: "Cocina",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "KITCHEN",
    subCategoryEn: "Kitchen",
    subCategoryEs: "Cocina",
    descriptionEN:
      "The kitchen is a complex area, full of large and small appliances but it is also the place where we prepare our daily food. This area, due to its high traffic and variety of materials and products, can be overwhelming when its time for a deep clean routine. It is vital to establish a care routine in this area of the home so that it looks and functions properly.",
    descriptionES:
      "La cocina es un área compleja, llena de electrodomésticos grandes y pequeños pero también es el lugar donde preparamos nuestra comida diaria. Esta área, debido a su alto tráfico y variedad de materiales y productos, puede ser abrumadora cuando se trata de limpieza profunda. Es vital establecer una rutina de cuidado en esta área del hogar para que se vea y funcione correctamente.",
    image: `https://${req.get("host")}/assets/kitchen.png`,
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    name: "Other Spaces",
    nameEN: "Other Spaces",
    nameES: "Otros Espacios",
    category: "CLEANING",
    categoryEn: "Cleaning",
    categoryEs: "Limpieza",
    subCategory: "OTHER SPACES",
    subCategoryEn: "Other Spaces",
    subCategoryEs: "Otros Espacios",
    descriptionEN:
      "Every home is a unique world, every home has different areas and spaces. Attending every corner of your home is a priority. Areas such as balconies, outdoor, equipment rooms or even workstations are many times left at the end of a to-do list. Here we show you that each area should be cared equally, to guarantee a comprehensive, careful home with little deterioration.",
    descriptionES:
      "Cada hogar es un mundo, cada hogar tiene diferentes áreas y espacios. Atender cada rincón de tu hogar es una prioridad. Áreas como balcones, áreas exteriores, habitaciones de equipos o de trabajo, muchas veces se dejan para lo último en la lista de tareas. Aquí te mostramos que cada área debe ser cuidada por igual para garantizar un hogar integral, cuidadoso y con poco deterioro.",
    image: `https://${req.get("host")}/assets/kitchen.png`,
  },
];
