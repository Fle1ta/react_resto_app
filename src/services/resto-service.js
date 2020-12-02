export default class RestoService{

    _apiBase = 'http://localhost:3000';

    async getResource(url){
        let res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`Couldn't fetch ${url}, received ${res.status}`)
        }
        return  await res.json();
    }

    async postData(url, data){
        let res = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    postOrder = async (order) => {
        return await this.postData(`/order`, order);
    }

    getMenuItems = async () => {
        return await this.getResource(`/menu/`);
    }    
}