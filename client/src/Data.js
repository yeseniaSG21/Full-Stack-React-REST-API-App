import config from './config';

/**
 * Data is a helper class that provides utility methods to allow the React client to talk to the Express server.
    ** api(), is used to make the GET and POST requests to the REST API. 
    ** Contains helper methods to GET, POST, PUT, and DELETE requests to the REST API.
**/

export default class Data {
    api( path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
        const url = config.apiBaseUrl + path;
    
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
        options.body = JSON.stringify(body);
        }

        if (requiresAuth) {    
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    // API GET request to retrieve user
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }
    
    // API POST request to create a new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // API GET request to find courses
    async getCourses() {
        const response = await this.api('/courses', 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        } else {
            throw new Error();
        }
    }

    // API POST request to create a new course
    async createCourse(body, currentUser) {
        const response = await this.api('/courses', 'POST', body, )
    }

    // API PUT request to update a course
    async updateCourse() {

    }


    // API DELETE request to delete courses
    async deleteCourse() {

    }
}
