import { NotFoundException } from "../errors/NotFoundException.error.js";
import { bedroomDao } from "../dao/index.js";

export const bedroomsController = {}

bedroomsController.getAllBedroomsData = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const bedroomName = req.query.location; //! Getting bedroom name of location param
        console.log(bedroomName);
        const dataLimit = req.query.limit;
        const dataSortBy = req.query.sortBy;
        const dataTypeSort = req.query.typeSort;
        
        //* if bedroom name exist, controller get data filtered by location
        if (bedroomName) {
            sensorsData = await bedroomDao.getBedroomsSensorsByName(bedroomName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort ? dataTypeSort : 'asc');
            actuatorsData = await bedroomDao.getBedroomsActuatorsByName(bedroomName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort ? dataTypeSort : 'asc');
        } else { 
            // * if bedroom name not exist, data get of all bedrooms
            sensorsData = await bedroomDao.getBedroomsSensors();
            actuatorsData = await bedroomDao.getBedroomsActuators();
        }


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getAllBedroomsData: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

bedroomsController.createBedroomData = async (req, res, next) => {
    try {
        //* get newData for bedroom of request body
        const newData =  req.body;

        if (!newData) {
            throw new NotFoundException("To create bedroom information, is required data by body. ")
        }

        const saveData = await bedroomDao.createBedroomData(newData);

        res.status(200).json({
            success: true,
            message: "New data for bedrooms is sucessfully created.",
            data: saveData
        })
        
    } catch (error) {
        console.error(`Error in Bedrooms Controller: createBedroomData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
        
    }
}

bedroomsController.getLastRecords = async (req, res, next) => {
    try {
        const bedroomName = req.query.location;

        if (!bedroomName) {
            throw new NotFoundException("Location parameter is required.");
        }

        const { actuatorsLastRecord, sensorsLastRecord } = await bedroomDao.getLastRecords(bedroomName);

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

bedroomsController.getSensorRecords = async (req,res, next) => {
    try {
        const bedroomName = req.query.location;
        const sensorName = req.query.sensorName;
        
        if (!bedroomName || !sensorName) {
            throw new NotFoundException("'location' and 'sensorName' query params must be required")
        }
        const sensorRecords = await bedroomDao.getSensorRecords(bedroomName, sensorName);

        res.status(200).json({
            success: true,
            records: sensorRecords
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getSensorRecords: ${error.message}`);
        next(error);
        throw error;
    }
}

bedroomsController.getActuatorRecords = async (req,res, next) => {
    try {
        const bedroomName = req.query.location;
        const actuatorName = req.query.actuatorName;
        
        if (!bedroomName || !actuatorName) {
            throw new NotFoundException("'location' and 'actuatorName' query params must be required")
        }
        const actuatorRecords = await bedroomDao.getActuatorRecords(bedroomName, actuatorName);

        res.status(200).json({
            success: true,
            records: actuatorRecords
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getSensorRecords: ${error.message}`);
        next(error);
        throw error;
    }
}

bedroomsController.getSensorChartData = async (req, res, next) => {
    try {
        const bedroomName = req.query.location;
        const sensorName = req.query.sensorName;

        if (!bedroomName || !sensorName) {
            throw new NotFoundException("'location' and 'sensorName' query params must be required");
        }

        const sensorData = await bedroomDao.getSensorChartData(bedroomName, sensorName);

        res.status(200).json({
            success: true,
            data: sensorData
        });
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getSensorChartData: ${error.message}`);
        next(error);
    }
};

// Eliminar un registro de dormitorio por ID
bedroomsController.deleteBedroomRecordById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID no proporcionado' });
        }

        const result = await bedroomDao.deleteBedroomById(id); // Cambiado aquí

        if (result.deletedCount === 0) { // Cambiado aquí
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        console.error(`Error en deleteRecord: ${error.message}`);
        res.status(500).json({ message: `Error al eliminar el registro: ${error.message}` });
    }
};