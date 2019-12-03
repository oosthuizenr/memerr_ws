import * as _ from "lodash";
import axios from "axios";
import { imgurCreds } from "../secrets";
import * as express from 'express';

const instance = axios.create();

//Intercept every request and set the auth header.
instance.interceptors.request.use(async (config) => {
    config.headers['Authorization'] = `Client-ID ${imgurCreds.clientId}`;

    return config;
}, error => {
    return Promise.reject(error);
});

export const handlMemesRequest = async (req: express.Request, res: express.Response) => {
    const { tag, page, sort, window } = req.query

    let tagValue = tag || "memes";
    let sortValue = sort || "time";
    let windowValue = window || "day";
    let pageValue = page || "1";

    const memesResponse = await instance.get(`https://api.imgur.com/3/gallery/t/${tagValue}/${sortValue}/${windowValue}/${pageValue}`);

    if (memesResponse.status === 200) {
        const toReturn = _.map(memesResponse.data.data.items, (item: any) => {
            return _.map(item.images, (image: any) => {
                const { id, type, width, height, nsfw, link, title, description } = image;

                return {
                    id,
                    type,
                    title,
                    description,
                    width,
                    height,
                    nsfw,
                    link
                }
            });
        });

        res.status(200).send(toReturn);
    } else {
        res.status(500).end();
    }
}