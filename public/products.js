const template = Handlebars.compile(`
                                    <table>
                                      <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Photo</th>
                                      </tr>
                                      {{#each product}}
                                      <tr>
                                        <th>{{this.title}}</th>
                                        <th>{{this.price}}</th>
                                        <th><img src={{this.thumbnail}}></img></th>
                                      </tr>
                                      {{/each}}                                    
                                     `);
const getData = async () => {
  const data = await fetch('http://localhost:8080/api/products')
  return data.json().then(result => document.querySelector('span').innerHTML = template({product:result}))
}
getData()