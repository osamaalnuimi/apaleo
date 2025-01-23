import { TestBed } from '@angular/core/testing';
import { ApiResponseHandlerService } from '@apaleo/shared/util-api-response-handler-service';
import { User, UsersResponse } from '@apaleo/shared/util-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { map, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { UserListDataService } from '../../infrastructure/user-list.data.service';
import { userListActions } from './user-list.actions';
import { UserListEffects } from './user-list.effects';

describe('UserListEffects', () => {
  let effects: UserListEffects;
  let actions$: Observable<any>;
  let testScheduler: TestScheduler;
  let mockUserListDataService: jest.Mocked<UserListDataService>;
  let mockApiHandlingService: jest.Mocked<ApiResponseHandlerService>;

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

  beforeEach(() => {
    mockUserListDataService = {
      load: jest.fn(),
    } as any;

    mockApiHandlingService = {
      handleResponse: jest.fn(),
    } as any;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      providers: [
        UserListEffects,
        provideMockActions(() => actions$),
        {
          provide: UserListDataService,
          useValue: mockUserListDataService,
        },
        {
          provide: ApiResponseHandlerService,
          useValue: mockApiHandlingService,
        },
      ],
    });

    effects = TestBed.inject(UserListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle successful user list load', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const mockResponse: UsersResponse = {
        users: mockUsers,
        total: mockUsers.length,
        skip: 0,
        limit: 10,
      };

      // Mock the API response handler
      mockApiHandlingService.handleResponse.mockImplementation(
        (config) => (source$) =>
          source$.pipe(map(() => config.successAction(mockResponse)))
      );

      // Mock the data service response
      mockUserListDataService.load.mockReturnValue(
        cold('-a|', { a: mockResponse })
      );

      // Trigger the load action
      actions$ = hot('-a-', { a: userListActions.loadUserList() });

      // Expected success action with mock data
      const expected = hot('--a', {
        a: userListActions.loadUserListSuccess({
          userList: mockUsers,
          totalCount: mockUsers.length,
        }),
      });

      expectObservable(effects.loadUserList$).toEqual(expected);
    });
  });
});
