import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductService} from './product.service';
import {Product} from '../../interface/Product';
import {environment} from '../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const productEndPoint = `${environment.apiUrl}product`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a product', () => {
    const mockProduct: Product = {id: '1', label: 'Product 1', price: '1200'};

    service.updateProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${productEndPoint}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should save a product', () => {
    const mockProduct: Product = {id: '1', label: 'Product 1', price: 1200};

    service.saveProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(productEndPoint);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should find all products', () => {
    const mockProducts: Product[] = [{id: '1', label: 'Product 1', price: 1200}, {
      id: '2',
      label: 'Product 2',
      price: 1200
    }];

    service.findAllProduct().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(productEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should find paginated products', () => {
    const mockProducts: Product[] = [
      {id: '1', label: 'Product 1', price: 1200},
      {id: '2', label: 'Product 2', price: 1200},
      {id: '3', label: 'Product 3', price: 1200},
      {id: '4', label: 'Product 4', price: 1200}
    ];

    service.findPaginatedAllProduct(1, 2).subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts.slice(0, 2));
    });

    const req = httpMock.expectOne(productEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should find paginated favourite products', () => {
    const currentUser = 1;
    const mockProducts: Product[] = [
      {id: '1', label: 'Product 1', isFavouriteOf: [1, 2], price: 1200},
      {id: '2', label: 'Product 2', isFavouriteOf: [2], price: 1200},
      {id: '3', label: 'Product 3', isFavouriteOf: [1], price: 1200}
    ];

    service.findPaginatedAllFavouriteProduct(1, 2, currentUser).subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual([mockProducts[0], mockProducts[2]]);
    });

    const req = httpMock.expectOne(productEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should find product by id', () => {
    const mockProduct: Product = {id: '1', label: 'Product 1', price: 1200};

    service.findById('1').subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${productEndPoint}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should delete product by id', () => {
    const mockProduct: Product = {id: '1', label: 'Product 1', price: 1200};

    service.deleteById('1').subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${productEndPoint}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProduct);
  });
});
