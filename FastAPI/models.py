import sqlite3
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from typing import List
from sqlalchemy.orm import Session
import models
import sqlite3
conn = sqlite3.connect('books.db')
conn.execute('''CREATE TABLE  IF NOT EXISTS books
                 (user_id INT,
                  book_id INT,
                  rating REAL,
                  title TEXT)''')
conn.commit()

conn.execute('''CREATE TABLE  IF NOT EXISTS recommendations 
             (user_id INT,
            book_id INT,	
             count INT,	
             mean REAL,	
             title TEXT,
             rating REAL,
             url  TEXT,
             cover_image TEXT,
             mod_title  TEXT)''')

conn.commit()


# create the FastAPI app
app = FastAPI()

class Book(BaseModel):
    user_id: int
    book_id: int
    rating: float
    title: str



    
async def get_book(book_id: int):
    
    conn = sqlite3.connect('books.db')
    c = conn.cursor()
    # retrieve the book from the database
    cursor = c.execute('SELECT user_id, rating, title FROM books WHERE book_id = ?', (book_id,))
    book_data = cursor.fetchone()
    if book_data is None:
        return {'message': 'Book not found!'}
    else:
        return {'user_id': book_data[0], 'book_id': book_id, 'rating': book_data[1], 'title': book_data[2]}
class Recommendation(BaseModel):
    user_id:int
    book_id: int
    count: int
    mean: float
    title: str
    rating: float
    url: str
    cover_image: str
    mod_title: str   
async def get_book2():
    
    print("bookw")
    conn = sqlite3.connect('books.db')
    c = conn.cursor()
    # retrieve the book from the database
    cursor = c.execute('SELECT * FROM books' )
    book_data = cursor.fetchone()
    if book_data is None:
        return {'message': 'Book not found!'}
    else:
        return {'user_id': book_data[0], 'book_id': book_id, 'rating': book_data[1], 'title': book_data[2]}
       
async def add_recommendation(recommendation: Recommendation):
    # Connect to the SQLite database
    conn = sqlite3.connect('books.db')

    # Create a cursor
    cur = conn.cursor()

    # Define the SQL query to insert the data
    sql = '''INSERT INTO book_ratings (user_id, book_id, count, mean, title, rating, url, cover_image, mod_title)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'''

    # Execute the SQL query and commit the changes
    cur.execute(sql, (book_rating.user_id, book_rating.book_id, book_rating.count, book_rating.mean, book_rating.title, 
                      book_rating.rating, book_rating.url, book_rating.cover_image, book_rating.mod_title))
    conn.commit()

    # Close the cursor and database connection
    cur.close()
    conn.close()

    # Return a message confirming that the data was inserted successfully
    return {"message": "Book rating inserted successfully"}

# define the API endpoints
# @app.post('/book/')
# async def create_book(book: Book):
#     conn = sqlite3.connect('books.db')
#     c = conn.cursor()
#     # insert the book into the database
#     c.execute('''INSERT INTO books (user_id, book_id, rating, title)
#                     VALUES (?, ?, ?, ?)''',
#                  (book.user_id, book.book_id, book.rating, book.title))
#     c.commit()
#     return {'message': 'Book created successfully!'}


# @app.get("/recommendations/{user_id}")
# async def read_recommendations(user_id: int)->List[Recommendation]:
#     # connect to the SQLite database
#     conn = sqlite3.connect('books.db')
    
#     # execute the query to fetch data from the 'book' table
#     cursor = conn.execute("SELECT user_id,book_id,count,mean,title, rating, url,cover_image,mod_title \
#                            FROM recommendations")
                            
#     # map the query result into a list of Book objects
    
#     recommend = [Recommendation(id=row[0], user_id=row[1], title=row[2], author=row[3], count=row[4], rating=row[5]) 
#              for row in cursor.fetchall()]
#     print(recommend)
#     # close the database connection
#     conn.close()
    
#     return recommend