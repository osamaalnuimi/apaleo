import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoadStatus, UserDataTable } from '@apaleo/shared/util-models';
import { UserListFacade } from '@apaleo/users/domain';
import { BehaviorSubject } from 'rxjs';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserListFacade: jest.Mocked<UserListFacade>;
  let loadedSubject: BehaviorSubject<DataLoadStatus>;
  let errorSubject: BehaviorSubject<Error | null>;
  let totalCountSubject: BehaviorSubject<number>;
  let dataTableSubject: BehaviorSubject<UserDataTable[]>;

  const mockData = {
    loaded: DataLoadStatus.LOADED,
    error: null,
    totalCount: 10,
    dataTable: [
      {
        firstName: 'User 1',
        lastName: 'User 1',
        age: 10,
        address: { city: 'City 1', address: 'Street 1' },
      },
      {
        firstName: 'User 2',
        lastName: 'User 2',
        age: 20,
        address: { city: 'City 2', address: 'Street 2' },
      },
    ] as UserDataTable[],
  };

  // Create a mock UserListFacade
  beforeEach(async () => {
    loadedSubject = new BehaviorSubject<DataLoadStatus>(mockData.loaded);
    errorSubject = new BehaviorSubject<Error | null>(mockData.error);
    totalCountSubject = new BehaviorSubject<number>(mockData.totalCount);
    dataTableSubject = new BehaviorSubject<UserDataTable[]>(mockData.dataTable);

    mockUserListFacade = {
      loaded$: loadedSubject.asObservable(),
      error$: errorSubject.asObservable(),
      totalCount$: totalCountSubject.asObservable(),
      dataTable$: dataTableSubject.asObservable(),
      load: jest.fn(),
    } as unknown as jest.Mocked<UserListFacade>;

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UserListFacade, useValue: mockUserListFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.DEFAULT_PAGE_SIZE).toBeDefined();
    expect(component.DEFAULT_PAGE_INDEX).toBeDefined();
    expect(component.DEFAULT_OPTIONS_LIMIT).toBeDefined();
    expect(component.DataLoadStatus).toBeDefined();
  });

  it('should call load() on init', () => {
    const loadSpy = jest.spyOn(component, 'load');
    component.ngOnInit();
    expect(loadSpy).toHaveBeenCalled();
    expect(mockUserListFacade.load).toHaveBeenCalled();
  });

  it('should combine observables correctly in vm$', (done) => {
    component.vm$.subscribe((result) => {
      expect(result).toEqual({
        loaded: mockData.loaded,
        error: mockData.error,
        totalCount: mockData.totalCount,
        dataTable: mockData.dataTable,
      });
      done();
    });
  });

  it('should call userListFacade.load() when load() is called', () => {
    component.load();
    expect(mockUserListFacade.load).toHaveBeenCalled();
  });

  // Test error scenario
  it('should handle error state', (done) => {
    const errorMockData = {
      ...mockData,
      loaded: DataLoadStatus.ERROR,
      error: new Error('Test error'),
    };

    loadedSubject.next(errorMockData.loaded);
    errorSubject.next(errorMockData.error);

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    component.vm$.subscribe((result) => {
      expect(result.loaded).toBe(DataLoadStatus.ERROR);
      expect(result.error).toEqual(errorMockData.error);
      done();
    });
  });

  // Test loading state
  it('should handle loading state', (done) => {
    const loadingMockData = {
      ...mockData,
      loaded: DataLoadStatus.LOADING,
    };

    loadedSubject.next(loadingMockData.loaded);

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    component.vm$.subscribe((result) => {
      expect(result.loaded).toBe(DataLoadStatus.LOADING);
      done();
    });
  });
});
