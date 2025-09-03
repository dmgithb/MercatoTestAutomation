export class TestDataManager {
  
  static getLoginData() {
    return {
      validCredentials: {
        email: process.env.TEST_USER_EMAIL || 'test@example.com',
        password: process.env.TEST_USER_PASSWORD || 'password123'
      },
      invalidCredentials: {
        email: 'invalid@test.com',
        password: 'wrongpassword'
      },
      emptyCredentials: {
        email: '',
        password: ''
      }
    };
  }

  static getSearchData() {
    return {
      validSearchTerms: ['sofa', 'chair', 'table', 'ottoman'],
      invalidSearchTerms: ['xyz123', 'nonexistent'],
      emptySearch: '',
      specialCharacters: ['!@#$', 'テスト', '中文'],
      longSearchTerm: 'a'.repeat(100)
    };
  }

  static getCategoryData() {
    return {
      availableCategories: [
        'Living Room',
        'Dining Room',
        'Bedroom',
        'Home Office',
        'Home Decor'
      ],
      availableBrands: [
        'Ambella Home',
        'Chaddock',
        'Chelsea House',
        'Flexsteel',
        'Hickory White',
        'Hooker',
        'Massoud Furniture',
        'Phillips Collection',
        'Sherrill Occasional',
        'Vanguard Furniture',
        'Visual Comfort',
        'Wildwood Home',
        'WoodBridge Furniture'
      ]
    };
  }

  static getTestUserData() {
    return {
      firstName: 'Test',
      lastName: 'User',
      email: process.env.TEST_USER_EMAIL || 'testuser@example.com',
      password: process.env.TEST_USER_PASSWORD || 'TestPassword123!',
      phone: '1234567890',
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'United States'
      }
    };
  }
}
