import axios from 'axios';

/**	An API Class to help with API calls.
 */
class ShortCollabsAPI {

	// static BASE_URL = "https://___.herokuapp.com";
	static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
	static token = localStorage.getItem('jwt');
	//	temporary token:
		//	
	
	static async request(endpoint, method="get", data={}) {
		
		// console.debug("API Call:", endpoint, method, data);

		//	set request settings
		const url = `${this.BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${ShortCollabsAPI.token}` };
		const params = (method==="get")
			? data
			: {};
			// set params

		try{
		
			return (await axios({ url, method, data, params, headers })).data;
		
		}catch(err){

				console.error("API Error:", err.response);
				let message = err.response.data.error.message;
				throw Array.isArray(message) ? message : [message];
			
		}

	}

	// Individual API routes

	/**	Register */
	static async signup(newUserData){
		
		try{

			const response = await this.request('authentication/register', 'post', newUserData);;
			console.log(response.token)
			console.log(response.username)
			if(response.token){
				this.token = response.token;
			}
			return response;
	
		}catch(error){
			return {error};
		}
		
	}

	/**	Login */
	static async login(userLoginData){

		try{

			const response = await this.request('authentication/login', 'post', userLoginData);;
			if(response.token){
				this.token = response.token;
			}
			return response;

		}catch(error){
			return {error};
		}

	}

	/**	Users: Return all.
	 *	Realistically this endpoint shouldn't exist(?) but just for demonstration.
	 */ 
	static async returnAllUsers(){

		try{

			const response = await this.request(`/users/`);
			return response.users;

		}catch(error){
			return {error}
		}

	}
	
	/**	Users: Search*/ 
	static async searchUsers(username){

		try{

			const response = await this.request(`/users/?username=${username}`);
			return response.users;

		}catch(error){
			return {error}
		}

	}



	/**	Users: Return by username.*/ 
	static async getUserData(username){

		try{

			const response = await this.request(`/users/${username}`);
			return response.user;

		}catch(error){
			return {error}
		}

	}


	/**	Users: Return private user details.*/ 
	static async getFullUserData(username){

		try{

			const response = await this.request(`/users/${username}/edit`);
			return response.user;

		}catch(error){
			return {error}
		}

	}

	/**	Users: Update user details.*/ 
	static async patchUser(username, userData){

		try{

			const response = await this.request(`/users/${username}/edit`, 'patch', userData);
			return response.user;

		}catch(error){
			return {error}
		}

	}

	/**	Users: Delete user. NOT ATTACHED.*/ 
	static async deleteUser(username){

		try{

			const response = await this.request(`/users/${username}/`, 'delete');
			return response.user;

		}catch(error){
			return {error}
		}

	}

	/**	Contents: Return all.
	 *	Realistically this endpoint shouldn't exist(?) but just for demonstration.
	 */ 
	static async returnAllContents(){

		try{

			const response = await this.request(`/contents/`);
			return response.contents;

		}catch(error){
			return {error}
		}

	}
	
	/**	Contents: Search*/ 
	static async searchContents(contentTitle){

		try{

			const response = await this.request(`/contents/?title=${contentTitle}`);
			return response.contents;

		}catch(error){
			return {error}
		}

	}

	/**	Contents: Return by contentID*/ 
	static async returnContent(contentID){

		try{

			const response = await this.request(`/contents/${contentID}`);
			return response.content;

		}catch(error){
			return {error}
		}

	}

	/**	Contents: Return private content details (master relation).*/ 
	static async getFullContentData(contentID){

		try{

			const response = await this.request(`/contents/${contentID}/edit`);
			return response.content;

		}catch(error){
			return {error}
		}

	}

	/**	Contents: New content (master relation).*/
	static async createContent(contentData){

		try{

			const response = await this.request(`/contents/`, 'post', contentData);
			return response.content;

		}catch(error){
			return {error}
		}

	}

	/**	Contents: Update content details (master relation)*/ 
	static async patchContent(contentID, contentData){

		try{

			const response = await this.request(`/contents/${contentID}/edit`, 'patch', contentData);
			return response.content;

		}catch(error){
			return {error}
		}

	}

	/**	Contents: Update content details (master relation)*/ 
	static async publishContent(contentID, contentData){

		try{

			const response = await this.request(`/contents/${contentID}/publish`, 'patch', contentData);
			return response.content;

		}catch(error){
			return {error}
		}

	}

	/**	Content: Delete content. NOT IMPLEMENTED.*/ 
	static async deleteContent(contentID){

		try{

			const response = await this.request(`/contents/${contentID}/`, 'delete');
			return response.content;

		}catch(error){
			return {error}
		}

	}

	/**	cu_join (ContentJoin):	Get. I imagine sending more information to this route is a way to count engagement. 2022-12-30 Note: using `cuJoin` placeholder.*/
	static async getJoinContentData(contentID, username){

		try{

			const response = await this.request(`/contents/${contentID}/${username}`, 'get');
			return response.cuJoin;

		}catch(error){
			return {error}
		}

	}
	
	/**	*/ 
	static async patchJoinContent(contentID, username, contentData){

		try{

			const response = await this.request('/users/')
			return response.property;

		}catch(error){
			return {error}
		}

	}
	
	/** cu_join	(ContentJoin): Delete content join. NOT IMPLEMENTED because how to restore?.*/ 
	static async deleteContent(contentID){

		try{

			const response = await this.request(`/contents/${contentID}/`, 'delete');
			return response.content;

		}catch(error){
			return {error}
		}

	}

}

export default ShortCollabsAPI;
