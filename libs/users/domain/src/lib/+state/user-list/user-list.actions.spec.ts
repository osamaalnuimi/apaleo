import { userListActions } from './user-list.actions';
import { User } from '@apaleo/shared/util-models';

describe('UserList Actions', () => {
  it('should create loadUserList action', () => {
    const action = userListActions.loadUserList();
    expect(action.type).toBe(userListActions.loadUserList.type);
  });

  it('should create loadUserListSuccess action', () => {
    const mockUsers: User[] = [
      {
        id: 6,
        firstName: 'Olivia',
        lastName: 'Wilson',
        maidenName: '',
        age: 22,
        gender: 'female',
        email: 'olivia.wilson@x.dummyjson.com',
        phone: '+91 607-295-6448',
        username: 'oliviaw',
        password: 'oliviawpass',
        birthDate: '2002-4-20',
        image: 'https://dummyjson.com/icon/oliviaw/128',
        bloodGroup: 'B+',
        height: 182.61,
        weight: 58,
        eyeColor: 'Hazel',
        hair: {
          color: 'Gray',
          type: 'Curly',
        },
        ip: '249.178.112.207',
        address: {
          address: '547 First Street',
          city: 'Fort Worth',
          state: 'Tennessee',
          stateCode: 'TN',
          postalCode: '83843',
          coordinates: {
            lat: 75.32627,
            lng: -26.15285,
          },
          country: 'United States',
        },
        macAddress: '9c:7f:ea:34:18:19',
        university: 'University of North Carolina--Chapel Hill',
        bank: {
          cardExpire: '05/28',
          cardNumber: '6771923832947881',
          cardType: 'Diners Club International',
          currency: 'BRL',
          iban: 'V6H0O5OE3Q4JVKWDTYWZABMD',
        },
        company: {
          department: 'Product Management',
          name: 'Pfannerstill Inc',
          title: 'Research Analyst',
          address: {
            address: '425 Sixth Street',
            city: 'Indianapolis',
            state: 'Oklahoma',
            stateCode: 'OK',
            postalCode: '74263',
            coordinates: {
              lat: 74.986644,
              lng: -132.916888,
            },
            country: 'United States',
          },
        },
        ein: '921-709',
        ssn: '836-772-168',
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15',
        crypto: {
          coin: 'Bitcoin',
          wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
          network: 'Ethereum (ERC20)',
        },
        role: 'moderator',
      },
    ];
    const action = userListActions.loadUserListSuccess({
      userList: mockUsers,
      totalCount: 1,
    });

    expect(action.type).toBe(userListActions.loadUserListSuccess.type);
    expect(action.userList).toEqual(mockUsers);
    expect(action.totalCount).toBe(1);
  });

  it('should create loadUserListFailure action', () => {
    const error = new Error('Test error');
    const action = userListActions.loadUserListFailure({ error });

    expect(action.type).toBe(userListActions.loadUserListFailure.type);
    expect(action.error).toEqual(error);
  });
});
