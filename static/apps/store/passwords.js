import axios from 'axios';
import {encrypt, decrypt} from '../utils/pgp.js'
import {observable, action, computed, runInAction} from "mobx";


export let appState = observable({
    bunny : [
    {
        'id' : 99,
        'updated_at': 'sa'
    }
    ]
});

appState.loadBunny = action(function(bugs) {
    bugs.forEach(async function(data) {
        let temp = {};
        temp['id'] = data.id;
        temp['site_url'] = data.site_url;
        temp['email'] = await decrypt(sessionStorage.getItem('key'), data.email);
        temp['username'] = await decrypt(sessionStorage.getItem('key'), data.username);
        temp['password'] = await decrypt(sessionStorage.getItem('key'), data.password);
        temp['note'] = await decrypt(sessionStorage.getItem('key'), data.note);
        temp['tag'] = await decrypt(sessionStorage.getItem('key'), data.tag);
        temp['created_at'] = data.created_at;
        temp['updated_at'] = data.updated_at;
        runInAction("update state after decrypting data", () => {
            this.bunny.push(temp);
        });
        
    });
    console.log(this.bunny);
});

appState.fetch = async function() {
    let xoxo = await axios.get('/api/vault/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    });
    this.loadBunny(xoxo.data);
}


/*export default class PasswordsAjax {
	@observable bunny = {};

	@action loadBunny(bunny) {
    	this.bunny = bunny;
    }

	bunnies = async() => {
	 let xoxo = await axios.get('/api/vault/', {
	 	headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    });
	 this.loadBunny(xoxo);
	}

}*/

/** export async function passwords(){
    let bunny = {};
    bunny = await axios.get('/api/vault/', {
    	headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    });

    axios({
        method: 'get',
        url: '/api/vault/',
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    }).then(function(response) {
        response.data.forEach(function(data) {
            let temp = {};
            temp['id'] = data.id;
            temp['site_url'] = data.site_url;
            temp['email'] = await decrypt(sessionStorage.getItem('key'), data.email);
            temp['username'] = await decrypt(sessionStorage.getItem('key'), data.username);
            temp['password'] = await decrypt(sessionStorage.getItem('key'), data.password);
            temp['note'] = await decrypt(sessionStorage.getItem('key'), data.note);
            temp['tag'] = await decrypt(sessionStorage.getItem('key'), data.tag);
            temp['created_at'] = data.created_at;
            temp['updated_at'] = data.updated_at;
            bunny.push(temp);
        });
    }).catch(function (err) {
        sweetAlert("Oops!", err.data, "error");
    }); 
    console.log(bunny); 
} **/