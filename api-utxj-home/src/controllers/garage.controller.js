import { NotFoundException } from "../errors/NotFoundException.error.js";
import { garageDao } from "../dao/index.js";

export const garageController = {}

garageController.getAllgarageData = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const garageName = req.query.location; //! Getting garage name of location param
        console.log(garageName);
        const dataLimit = req.query.limit;
        const dataSortBy = req.query.sortBy;
        const dataTypeSort = req.query.typeSort;

        //* if garage name exist, controller get data filtered by location
        if (garageName) {
            sensorsData = await garageDao.getgarageSensorsByName(garageName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort);
            actuatorsData = await garageDao.getgarageActuatorsByName(garageName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort);
        } else { 
            // * if garage name not exist, data get of all garages
            sensorsData = await garageDao.getgarageSensors();
            actuatorsData = await garageDao.getgarageActuators();
        }


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Garages Controller: getAllgaragesData: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

garageController.creategarageData = async (req, res, next) => {
    try {
        //* get newData for garage of request body
        const newData =  req.body;

        if (!newData) {
            throw new NotFoundException("To create garage information, is required data by body. ")
        }

        const saveData = await garageDao.creategarageData(newData);

        res.status(200).json({
            success: true,
            message: "New data for garage is sucessfully created.",
            data: saveData
        })
        
    } catch (error) {
        console.error(`Error in garage Controller: createGarageData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
        
    }
}

garageController.getLastRecords = async (req, res, next) => {
    try {
        const garageName = req.query.location;

        if (!garageName) {
            throw new NotFoundException("Location parameter is required.");
        }

        const { actuatorsLastRecord, sensorsLastRecord } = await garageDao.getLastRecords(garageName);

        res.status(200).json({
            success: true,
            sensorsData: sensorsLastRecord,
            actuatorsData: actuatorsLastRecord
        });
    } catch (error) {
        console.error(`Error in Last Records Controller: getLastRecords: ${error.message}`);
        next(error);
        throw error;
    }
};


garageController.getSensorRecords = async (req,res, next) => {
    try {
        const garageName = req.query.location;
        const sensorName = req.query.sensorName;
        
        if (!garageName || !sensorName) {
            throw new NotFoundException("'location' and 'sensorName' query params must be required")
        }
        const sensorRecords = await garageDao.getSensorRecords(garageName, sensorName);

        res.status(200).json({
            success: true,
            records: sensorRecords
        })
    } catch (error) {
        console.error(`Error in Garages Controller: getSensorRecords: ${error.message}`);
        next(error);
        throw error;
    }
}

garageController.getActuatorRecords = async (req,res, next) => {
    try {
        const garageName = req.query.location;
        const actuatorName = req.query.actuatorName;
        
        if (!garageName || !actuatorName) {
            throw new NotFoundException("'location' and 'actuatorName' query params must be required")
        }
        const actuatorRecords = await garageDao.getActuatorRecords(garageName, actuatorName);

        res.status(200).json({
            success: true,
            records: actuatorRecords
        })
    } catch (error) {
        console.error(`Error in Garages Controller: getSensorRecords: ${error.message}`);
        next(error);
        throw error;
    }
}

// Eliminar un registro de garage por ID
garageController.deleteGarageRecordById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID no proporcionado' });
        }

        const result = await garageDao.deleteGarageById(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        console.error(`Error en deleteGarageRecordById: ${error.message}`);
        res.status(500).json({ message: `Error al eliminar el registro: ${error.message}` });
    }
};