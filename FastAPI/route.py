from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from typing import List
from sqlalchemy.orm import Session
from models import get_book,get_book2,add_recommendation
import sqlite3

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
# create the FastAPI app
app = FastAPI()


@app.get('/book/')
def get_liked_books():
    get_book2()
    
    
@app.get('/book/{book_id}')
def get_liked_books(book_id: int):
    get_book(book_id)
    
 

         
@app.post('/recommendation/')
def add_recommendation1():
    
    
    recommendation1 = Recommendation()
    
#  we can call the ML here and the follwing data will be given to the

    recommendation1.user_id = 22,
    recommendation1.book_id = 3323,
    recommendation1.count = 6,
    recommendation1.mean =6 ,	
    recommendation1.title" :"the alchemy",	
    recommendation1.rating = 6,
    recommendation1.url ="http://127.0.0.1:8000/books",
    recommendation1.cover_image ="TEXT",
    recommendation1.mod_title ="TEXT"
    
# we will add to the database 

    add_recommendation(recommendation1)



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