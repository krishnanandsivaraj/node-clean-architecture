import {ValidatorResponse} from "@core/validator/";
import {IValidationErrorParser} from "@core/validator";
import {TYPES} from '@ioc'
import { injectable, inject } from "@core/di";
import ValidationError from "@core/exceptions/ValidatorError";
import { ERROR_TYPE } from "@core/exceptions";
import IValidatorGateway from "@core/validator/gateway/IValidatorGateway";
import * as Joi from 'joi'



@injectable()
export default class JoiValidatorGateway<T> implements IValidatorGateway<T,Joi.Schema>{
    errorGenerator : IValidationErrorParser;
    constructor(
                @inject(TYPES.JoiValidationErrorParser) errorGenerator : IValidationErrorParser
                ){
        this.errorGenerator = errorGenerator
    }
    async validateData(data: T, schema : Joi.Schema): Promise<T> {
        let errors : ValidationError[] = [];
        try{
            data = await Joi.validate(data,schema);
            return data;
        }catch(error){
            console.log(error);
            errors = this.errorGenerator.generate(error.details);
            let response   = new ValidatorResponse(ERROR_TYPE.VALIDATION_ERROR,errors);
            throw response;
        }
        
        
    }
}