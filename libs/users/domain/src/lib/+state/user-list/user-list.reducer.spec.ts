import { userListActions } from './user-list.actions';
import { userListFeature } from './user-list.reducer';
import { User, DataLoadStatus } from '@apaleo/shared/util-models';

describe('UserList Reducer', () => {
  const initialState = userListFeature.reducer(undefined, { type: 'INIT' });

  it('should return initial state', () => {
    expect(initialState.loaded).toBe(DataLoadStatus.INITIAL);
    expect(initialState.error).toBeUndefined();
    expect(initialState.totalCount).toBe(0);
  });

  it('should handle loadUserList action', () => {
    const action = userListActions.loadUserList();
    const state = userListFeature.reducer(initialState, action);

    expect(state.loaded).toBe(DataLoadStatus.LOADING);
    expect(state.error).toBeNull();
  });

  it('should handle loadUserListSuccess action', () => {
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
    const state = userListFeature.reducer(initialState, action);

    expect(state.loaded).toBe(DataLoadStatus.LOADED);
    expect(state.totalCount).toBe(1);
    expect(state.ids).toEqual([6]);
    expect(state.entities[6]).toEqual(mockUsers[0]);
  });

  it('should handle loadUserListFailure action', () => {
    const error = new Error('Test error');
    const action = userListActions.loadUserListFailure({ error });
    const state = userListFeature.reducer(initialState, action);

    expect(state.loaded).toBe(DataLoadStatus.ERROR);
    expect(state.error).toEqual(error);
  });

  describe('Selectors', () => {
    const mockUsers: User[] = [
      {
        id: 4,
        firstName: 'James',
        lastName: 'Davis',
        maidenName: '',
        age: 45,
        gender: 'male',
        email: 'james.davis@x.dummyjson.com',
        phone: '+49 614-958-9364',
        username: 'jamesd',
        password: 'jamesdpass',
        birthDate: '1979-5-4',
        image: 'https://dummyjson.com/icon/jamesd/128',
        bloodGroup: 'AB+',
        height: 193.31,
        weight: 62.1,
        eyeColor: 'Amber',
        hair: {
          color: 'Blonde',
          type: 'Straight',
        },
        ip: '101.118.131.66',
        address: {
          address: '238 Jefferson Street',
          city: 'Seattle',
          state: 'Pennsylvania',
          stateCode: 'PA',
          postalCode: '68354',
          coordinates: {
            lat: 16.782513,
            lng: -139.34723,
          },
          country: 'United States',
        },
        macAddress: '10:7d:df:1f:97:58',
        university: 'University of Southern California',
        bank: {
          cardExpire: '05/29',
          cardNumber: '5005519846254763',
          cardType: 'Mastercard',
          currency: 'INR',
          iban: '7N7ZH1PJ8Q4WU1K965HQQR27',
        },
        company: {
          department: 'Support',
          name: 'Pagac and Sons',
          title: 'Research Analyst',
          address: {
            address: '1622 Lincoln Street',
            city: 'Fort Worth',
            state: 'Pennsylvania',
            stateCode: 'PA',
            postalCode: '27768',
            coordinates: {
              lat: 54.91193,
              lng: -79.498328,
            },
            country: 'United States',
          },
        },
        ein: '904-810',
        ssn: '116-951-314',
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
        crypto: {
          coin: 'Bitcoin',
          wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
          network: 'Ethereum (ERC20)',
        },
        role: 'admin',
      },
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

    const loadedState = userListFeature.reducer(
      initialState,
      userListActions.loadUserListSuccess({
        userList: mockUsers,
        totalCount: 2,
      })
    );

    it('should select all users', () => {
      const result = userListFeature.selectAll({ userList: loadedState });
      expect(result).toEqual(mockUsers);
    });
  });
});
