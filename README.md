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

The main constraints are:

a)The data should be stored and handled in your application as a JSON.
b)When you start your server, the system should be able to load the data in the file(s) managing the
books and loans.
c)All get operations should send an outcome a JSON object.
