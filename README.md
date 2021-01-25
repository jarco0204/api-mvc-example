This is the API that handles data for a fictional public library.
The two main entities are Book and Loan.

The former has these attributes:
1)id
2)name
3)authors
4)year
5)publisher

The latter has these attributes:
1)id
2)book id
3)date
4)client name
5)was returned
6)date of return

In order to run this code, write the following commands:

1)npm run install

2)In one terminal window write: npm run dev

3)In a different terminal window write:
a)cd tests
b)node book.test.js
c)node loan.test.js
