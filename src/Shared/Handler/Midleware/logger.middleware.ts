import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { LoggerService } from 'src/Shared/Logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly LoggerService: LoggerService,
        /* private readonly accessTokenService: AcessTokenService, */
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const method = req.method;
        /*         if (method === 'GET' || req.originalUrl === '/access-token/generate') {
                    return next();
                }
         */
        const authorizationHeader = req.headers['authorization'];
        /* const token = authorizationHeader.split(" ")[1]; */
        const reqBaseUrl = req.baseUrl;
        const entity = reqBaseUrl.split('/')[1];
        let previous = null;
        

        if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
            try {
                const id = reqBaseUrl.split('/')[2];
                //oldData = await this.LoggerService.dynamicFindOne(entity, Number(id));
                const protocol = req.protocol;
                const host = req.hostname;
                const port = process.env.PORT;
                let baseUrl = `${protocol}://${host}`;
                if (host === 'localhost') {
                    baseUrl = `${baseUrl}:${port}`
                }

                const options = {
                    method: 'GET',
                    url: `${baseUrl}/${entity}/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        /* Authorization: `Bearer ${token}`, */
                    },
                };

                const { data } = await axios(options);
                previous = data;
            } catch (error) {
                console.error(error);
            }
        }

        const originalSend = res.send;
        let responseBody;

        res.send = function (body) {
            responseBody = body;
            return originalSend.apply(this, arguments);
        };

        
        res.on('finish', async () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try {
                    let action: string;
                    let recordId: number;
                    switch (method) {
                        case 'POST':
                            action = JSON.parse(responseBody).length > 0 ? 'createMany' : 'create';
                            recordId = JSON.parse(responseBody).id ?? 0;
                            await this.LoggerService.logLogger(action, entity, recordId, null, responseBody);
                            break;
                        case 'PUT':
                        case 'PATCH':
                            action = 'update';
                            recordId = Number(reqBaseUrl.split('/')[2]);
                            await this.LoggerService.logLogger(action, entity, recordId, JSON.stringify(previous), responseBody);
                            break;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });

        next();
    }
}
