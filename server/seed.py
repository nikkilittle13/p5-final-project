#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Recipe, Category, Comment, recipe_categories


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

with app.app_context():

    db.drop_all()
    db.create_all()

    users = [
        User(username='john_doe'),
        User(username='jane_doe'),
        User(username='alice_smith'),
        User(username='bob_johnson'),
        User(username='carol_williams')
    ]

    for user in users:
        db.session.add(user)
        db.session.commit()

    categories = [
        Category(name='Dessert'),
        Category(name='Dinner'),
        Category(name='Served Hot'),
        Category(name='Served Cold'),
        Category(name='Salad'),
        Category(name='Soup'),
        Category(name='Breakfast')
    ]

    for category in categories:
        db.session.add(category)
        db.session.commit()

    recipes = [
        Recipe(
            title='Chocolate Cake',
            ingredients='Flour\nSugar\nCocoa powder\nBaking powder\nEggs\nMilk\nButter',
            instructions='Mix ingredients\nBake at 350F for 30 minutes',
            user_id=users[0].id,
            image='https://ohsweetbasil.com/wp-content/uploads/chocolate-cake-with-chocolate-frosting-recipe-13-1365x2048.jpg'
        ),
        Recipe(
            title='Spaghetti Bolognese',
            ingredients='Spaghetti\nGround beef\nTomato sauce\nOnion\nGarlic',
            instructions='Cook beef with onions and garlic\nAdd sauce\nServe with spaghetti',
            user_id=users[1].id,
            image='https://i1.wp.com/www.feeleat.fr/wp-content/uploads/2018/09/spaghetti-bolognese-106560-1-scaled.jpeg?fit=2560%2C1707&ssl=1'
        ),
        Recipe(
            title='Caesar Salad',
            ingredients='Romaine lettuce\nCroutons\nParmesan cheese\nCaesar dressing',
            instructions='Toss ingredients together\nServe chilled',
            user_id=users[2].id,
            image='https://www.jocooks.com/wp-content/uploads/2020/07/caesar-salad-1-13.jpg'
        ),
        Recipe(
            title='Tomato Soup',
            ingredients='Tomatoes\nOnion\nGarlic\nBasil\nCream',
            instructions='Cook tomatoes with onions and garlic\nBlend until smooth\nAdd cream',
            user_id=users[3].id,
            image='https://www.savvymamalifestyle.com/wp-content/uploads/2020/10/Tomato-Soup.jpg'
        ),
        Recipe(
            title='Tiramisu',
            ingredients='Mascarpone cheese\nEspresso\nLadyfingers\nCocoa powder',
            instructions='Layer ingredients\nRefrigerate for 4 hours',
            user_id=users[4].id,
            image='https://www.aspicyperspective.com/wp-content/uploads/2019/12/best-easy-tiramisu-recipe-27.jpg'
        ),
        Recipe(
            title='Chicken Curry',
            ingredients='Chicken\nCurry powder\nCoconut milk\nOnion\nGarlic\nGinger',
            instructions='Sauté onions, garlic, and ginger\nAdd chicken and curry powder\nPour in coconut milk and simmer',
            user_id=users[0].id,
            image='https://www.familyfoodonthetable.com/wp-content/uploads/2017/01/Quick-chicken-curry-4.jpg'
        ),
        Recipe(
            title='Vegetable Stir Fry',
            ingredients='Broccoli\nBell peppers\nCarrots\nSoy sauce\nGinger',
            instructions='Sauté vegetables in a hot pan\nAdd soy sauce and ginger\nServe with rice',
            user_id=users[1].id,
            image='https://www.cookingforkeeps.com/wp-content/uploads/2021/05/Healthy-Vegetable-Stir-Fry-Web-11.jpg'
        ),
        Recipe(
            title='Beef Tacos',
            ingredients='Ground beef\nTaco seasoning\nTaco shells\nLettuce\nTomato\nCheese',
            instructions='Cook beef with taco seasoning\nFill taco shells with beef and toppings',
            user_id=users[2].id,
            image='https://www.saltandlavender.com/wp-content/uploads/2020/11/ground-beef-tacos-recipe-1-1024x1536.jpg'
        ),
        Recipe(
            title='Pancakes',
            ingredients='Flour\nMilk\nEggs\nBaking powder\nSugar\nButter',
            instructions='Mix ingredients and pour batter onto a hot skillet\nFlip when bubbles form',
            user_id=users[3].id,
            image='https://i2.wp.com/duesouth.media/wp-content/uploads/2019/03/Pancake-recipe.jpg?fit=1989%2C1800&ssl=1'
        ),
        Recipe(
            title='Lemon Tart',
            ingredients='Lemon juice\nSugar\nButter\nEggs\nPie crust',
            instructions='Mix lemon juice, sugar, and eggs\nPour into pie crust and bake',
            user_id=users[4].id,
            image='https://richanddelish.com/wp-content/uploads/2022/07/lemon-tart-1024x1024.jpg'
        ),
    ]

    for recipe in recipes:
        db.session.add(recipe)
        db.session.commit()

    comments = [
        Comment(content='Delicious cake!', recipe_id=recipes[0].id, user_id=users[1].id), 
        Comment(content='Great recipe!', recipe_id=recipes[1].id, user_id=users[0].id), 
        Comment(content='Love this salad!', recipe_id=recipes[2].id, user_id=users[3].id),
        Comment(content='Tasty soup!', recipe_id=recipes[3].id, user_id=users[4].id),
        Comment(content='Best tiramisu ever!', recipe_id=recipes[4].id, user_id=users[2].id),
        Comment(content='Very flavorful!', recipe_id=recipes[1].id, user_id=users[1].id),
        Comment(content='Perfect for dinner!', recipe_id=recipes[2].id, user_id=users[0].id),
        Comment(content='So creamy!', recipe_id=recipes[3].id, user_id=users[2].id),
        Comment(content='A classic!', recipe_id=recipes[4].id, user_id=users[3].id),
        Comment(content='Will make again!', recipe_id=recipes[0].id, user_id=users[4].id),
        Comment(content='Obsessed with this recipe!Great for the family.', recipe_id=recipes[5].id, user_id=users[4].id),
        Comment(content='Great for a cozy evening', recipe_id=recipes[5].id, user_id=users[2].id),
        Comment(content='Taste fresh. Will make again.', recipe_id=recipes[6].id, user_id=users[1].id),
        Comment(content='Could use some more sauce', recipe_id=recipes[6].id, user_id=users[2].id),
        Comment(content='Yum!', recipe_id=recipes[6].id, user_id=users[0].id),
        Comment(content='Best taco recipe!', recipe_id=recipes[7].id, user_id=users[3].id),
        Comment(content='These are a hit in my house', recipe_id=recipes[7].id, user_id=users[2].id),
        Comment(content='SO GOOD!', recipe_id=recipes[8].id, user_id=users[4].id),
        Comment(content='My kids will only eat this recipe', recipe_id=recipes[8].id, user_id=users[3].id),
        Comment(content='Fluffy and delicious', recipe_id=recipes[8].id, user_id=users[2].id),
        Comment(content='Made this for a party and it was gone!', recipe_id=recipes[9].id, user_id=users[0].id),
        Comment(content='Pretty good', recipe_id=recipes[9].id, user_id=users[1].id),
        Comment(content='Great flavor!', recipe_id=recipes[9].id, user_id=users[4].id),

    ]

    for comment in comments:
        db.session.add(comment)
        db.session.commit()

    recipes[0].categories.append(categories[0])
    recipes[1].categories.append(categories[2])
    recipes[1].categories.append(categories[1])
    recipes[2].categories.append(categories[3])
    recipes[2].categories.append(categories[4])
    recipes[3].categories.append(categories[2])
    recipes[3].categories.append(categories[5])
    recipes[4].categories.append(categories[0])
    recipes[4].categories.append(categories[3])
    recipes[5].categories.append(categories[1])
    recipes[5].categories.append(categories[2])
    recipes[6].categories.append(categories[1])
    recipes[6].categories.append(categories[2])
    recipes[7].categories.append(categories[1])
    recipes[7].categories.append(categories[2])
    recipes[8].categories.append(categories[6])
    recipes[8].categories.append(categories[2])
    recipes[9].categories.append(categories[0])
    recipes[9].categories.append(categories[3])


    db.session.commit()

    print("Seed data added successfully!")