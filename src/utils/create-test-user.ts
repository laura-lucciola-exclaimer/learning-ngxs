import { User } from "../types/user";

export function createTestUser(): User {
    return {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',   
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
    };
  }