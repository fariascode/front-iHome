import mongoose from 'mongoose';  // Importar mongoose al principio del archivo
import Kitchen from "../models/kitchen.schema.js";
import { NotFoundException } from "../errors/index.js"

export const KitchenDao = {}

KitchenDao.getAllKitchens = async () => {
    try {
        const KitchensData = await Kitchen.find({}).sort({
            initialDate: 1
        });

        return KitchensData;
    } catch (error) {
        console.error(`Error in KitchenDao getAllKitchens: ${error.message}`);
        throw error;
    }
}


// ! Get only information of Kitchens filter by type = sensors
KitchenDao.getKitchensSensors = async () => {
    try {
        const sensorsData = await Kitchen.find({
            type: /sensor/i
        }).sort({
            initialDate: 1
        });
        
        return sensorsData;
    } catch (error) {
        console.error(`Error in KitchenDao getAllKitchens: ${error.message}`);
        throw error;
    }
}

// ! Get only information of Kitchens filter by type = actuators
KitchenDao.getKitchensActuators = async () => {
    try {
        const actuatorsData = await Kitchen.find({
            type: /actuator|actuador/i
        }).sort({
            initialDate: 1
        });
        
        return actuatorsData;
    } catch (error) {
        console.error(`Error in KitchenDao getAllKitchens: ${error.message}`);
        throw error;
    }
}

// ! Get only information of Kitchens filter by type = sensors and by location name
KitchenDao.getKitchensSensorsByName = async (KitchenName, limit = 500, sortBy, typeSort = 'asc') => {
    try {
        let sensorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of Kitchen
            const validSortProperty = Object.keys(Kitchen.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return sensorsData = await Kitchen.find({
                    type: /sensor/i,
                    location: KitchenName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of Kitchen to sort.`)
            }
        }

        return sensorsData = await Kitchen.find({
            type: /sensor/i,
            location: KitchenName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in KitchenDao getAllKitchens: ${error.message}`);
        throw error;
    }
}

// ! Get only information of Kitchens filter by type = actuators and by location name
KitchenDao.getKitchensActuatorsByName = async (KitchenName, limit = 500, sortBy, typeSort = 'asc') => {
    try {
        let actuatorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of Kitchen
            const validSortProperty = Object.keys(Kitchen.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return actuatorsData = await Kitchen.find({
                    type: /actuator|actuador/i,
                    location: KitchenName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of Kitchen to sort.`)
            }
        }

        return actuatorsData = await Kitchen.find({
            type: /actuator|actuador/i,
            location: KitchenName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in KitchenDao getAllKitchens: ${error.message}`);
        throw error;
    }
}

KitchenDao.createKitchenData = async (newData) => {
    try {
        const savedData = await Kitchen.create(newData);

        return savedData;
    } catch (error) {
        console.error(`Error in KitchenDao createKitchenData: ${error.message}`);
        throw error;
    }
}

KitchenDao.getLastRecords = async (kitchenName) => {
    try {
        const sensorsLastRecord = await Kitchen.aggregate([
            { 
                $match: {
                    type: /sensor/i,
                    location: kitchenName
                }
            },
            {
                $group: {
                    _id: "$name",
                    lastRecord: { $last: "$$ROOT" }
                }
            }
        ]);

        const actuatorsLastRecord = await Kitchen.aggregate([
            { 
                $match: {
                    type: /actuador/i,
                    location: kitchenName
                }
            },
            {
                $group: {
                    _id: "$name",
                    lastRecord: { $last: "$$ROOT" }
                }
            }
        ]);

        return {
            sensorsLastRecord,
            actuatorsLastRecord
        };
    } catch (error) {
        console.error(`Error in getLastRecords: ${error.message}`);
        throw error;
    }
};

KitchenDao.getSensorRecords = async (kitchenName, sensorName) => {
    try {
        const sensorRecords = await Kitchen.find({
            type: /sensor/i,
            location: kitchenName,
            name: sensorName
        }).sort("-registeredDate").limit(500)

        return sensorRecords
    } catch (error) {
        console.error(`Error in kitchenDAO getSensorRecords: ${error.message}`);
        throw error;
    }
}

KitchenDao.getActuatorRecords = async (kitchenName, actuatorName) => {
    try {
        const actuatorRecords = await Kitchen.find({
            type: /actuador/i,
            location: kitchenName,
            name: actuatorName
        }).sort("-registeredDate").limit(500)

        return actuatorRecords
    } catch (error) {
        console.error(`Error in kitchenDAO getSensorRecords: ${error.message}`);
        throw error;
    }
}

KitchenDao.deleteKitchenById = async (id) => {
    try {
        console.log(`Intentando eliminar el documento con ID: ${id}`);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }

        const objectId = new mongoose.Types.ObjectId(id);

        // Eliminar documento completo con el ID proporcionado
        const result = await Kitchen.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            throw new NotFoundException('Documento no encontrado');
        }

        console.log(`Resultado de eliminación: ${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.error(`Error en deleteKitchenById: ${error.message}`);
        throw error;
    }
};
