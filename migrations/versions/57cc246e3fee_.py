"""empty message

Revision ID: 57cc246e3fee
Revises: 
Create Date: 2023-03-14 21:06:42.130131

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57cc246e3fee'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bike',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('brand', sa.String(length=50), nullable=False),
    sa.Column('model', sa.String(length=50), nullable=False),
    sa.Column('bike_photo', sa.String(length=250), nullable=False),
    sa.Column('ask_1_license', sa.String(length=5), nullable=True),
    sa.Column('ask_11_limitable', sa.String(length=5), nullable=True),
    sa.Column('ask_2_wheels', sa.String(length=5), nullable=True),
    sa.Column('ask_3_surface', sa.String(length=5), nullable=True),
    sa.Column('ask_31_surface_offroad', sa.String(length=5), nullable=True),
    sa.Column('ask_311_motor_offroad', sa.String(length=5), nullable=True),
    sa.Column('ask_32_custom', sa.String(length=5), nullable=True),
    sa.Column('ask_321_refrigeration', sa.String(length=5), nullable=True),
    sa.Column('ask_4_comodity', sa.String(length=5), nullable=True),
    sa.Column('ask_5_style', sa.String(length=5), nullable=True),
    sa.Column('ask_6_price', sa.String(length=5), nullable=True),
    sa.Column('ask_7_new', sa.String(length=5), nullable=True),
    sa.Column('ask_8_response', sa.String(length=5), nullable=True),
    sa.Column('ask_9_reliability', sa.String(length=5), nullable=True),
    sa.Column('ask_10_power', sa.String(length=5), nullable=True),
    sa.Column('ask_11_armor', sa.String(length=5), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('bike_photo'),
    sa.UniqueConstraint('model')
    )
    op.create_table('photographer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=20), nullable=False),
    sa.Column('password', sa.String(length=105), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('instagram', sa.String(length=30), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.Column('location_name', sa.String(length=50), nullable=True),
    sa.Column('find_me_text', sa.String(length=50), nullable=True),
    sa.Column('services', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('instagram'),
    sa.UniqueConstraint('services'),
    sa.UniqueConstraint('user_name')
    )
    op.create_table('question',
    sa.Column('id', sa.String(length=30), nullable=False),
    sa.Column('question', sa.String(length=250), nullable=False),
    sa.Column('notes', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=20), nullable=False),
    sa.Column('password', sa.String(length=105), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('user_name')
    )
    op.create_table('answer',
    sa.Column('id', sa.String(length=30), nullable=False),
    sa.Column('answer', sa.String(length=250), nullable=False),
    sa.Column('previous_question_id', sa.String(length=30), nullable=True),
    sa.Column('next_question_id', sa.String(length=30), nullable=True),
    sa.Column('current_question_id', sa.String(length=30), nullable=True),
    sa.ForeignKeyConstraint(['current_question_id'], ['question.id'], ),
    sa.ForeignKeyConstraint(['next_question_id'], ['question.id'], ),
    sa.ForeignKeyConstraint(['previous_question_id'], ['question.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('route',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('start_location_name', sa.String(length=50), nullable=False),
    sa.Column('end_location_name', sa.String(length=50), nullable=False),
    sa.Column('description_text', sa.String(length=250), nullable=False),
    sa.Column('interest_text', sa.String(length=250), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('bike_id', sa.Integer(), nullable=True),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.Column('photographer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bike_id'], ['bike.id'], ),
    sa.ForeignKeyConstraint(['photographer_id'], ['photographer.id'], ),
    sa.ForeignKeyConstraint(['route_id'], ['route.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('path', sa.String(length=250), nullable=False),
    sa.Column('photo_type', sa.String(length=50), nullable=False),
    sa.Column('bike_id', sa.Integer(), nullable=True),
    sa.Column('photographer_id', sa.Integer(), nullable=True),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bike_id'], ['bike.id'], ),
    sa.ForeignKeyConstraint(['photographer_id'], ['photographer.id'], ),
    sa.ForeignKeyConstraint(['route_id'], ['route.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('path')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('photo')
    op.drop_table('favorite')
    op.drop_table('route')
    op.drop_table('answer')
    op.drop_table('user')
    op.drop_table('question')
    op.drop_table('photographer')
    op.drop_table('bike')
    # ### end Alembic commands ###
