import conf from "@/config/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {
      return false;
    }
  }

  getCurrentUser = async () => {
    try {
      const currentUser = await account.get();
      return currentUser;
    } catch (error) {
      console.log("getCurrentUser:", error);
    }
    return null;
  };

  logout = async () => {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("Logout:", error);
    }
  };
}

const appwriteService = new AppwriteService();

export default appwriteService;
