from scss import parser

# TODO: 
# pip install scss
# https://pythonhosted.org/scss/

file_path = path_to_file
src = open( file_path ).read()

# from file
print parser.load( 'file_path' )

# from string
print parser.parse( 'src' )

# Create parser object
p = parser.Stylesheet( options=dict( compress=True ) )
print p.loads( src )
p.load( file_path )
print p