const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const server = require('../wikiApiServer.js').app;
const serverArticles = require('../wikiApiServer.js').articles;

chai.use(chaiHttp);

describe('Plani-Wiki REST API', () => {
    describe('GET /articles', () => {
        it('it should return 0 articles', done => {
            chai.request(server)
                .get('/articles')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe(`PUT /articles/article1 with body 'content_article1'`, () => {
        it(`it should insert article1 and return http status 201`, done => {
            chai.request(server)
                .put('/articles/article1')
                .type('text/plain')
                .send('content_article1')
                .end((err, res) => {
                    res.should.have.status(201);
                    serverArticles[0].content.should.be.equals('content_article1');
                    done();
                });
        });
    });
    describe(`PUT /articles/article1 with body 'content_article1_v2'`, () => {
        it(`it should update article1 and return http status 200`, done => {
            chai.request(server)
                .put('/articles/article1')
                .type('text/plain')
                .send('content_article1_v2')
                .end((err, res) => {
                    res.should.have.status(200);
                    serverArticles[0].content.should.be.equals('content_article1_v2');
                    done();
                });
        });
    });
    describe(`PUT /articles/article2 with body 'content_article2'`, () => {
        it(`it should insert article2 and return http status 201`, done => {
            chai.request(server)
                .put('/articles/article2')
                .type('text/plain')
                .send('content_article2')
                .end((err, res) => {
                    res.should.have.status(201);
                    serverArticles[1].content.should.be.equals('content_article2');
                    done();
                });
        });
    });
    describe('GET /articles', () => {
        it('it should return 2 articles and http status 200', done => {
            chai.request(server)
                .get('/articles')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
    });
    describe('GET /articles/article1', () => {
        it(`it should return text 'content_article1_v2' and http status 200`, done => {
            chai.request(server)
                .get('/articles/article1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.html;
                    res.text.should.be.equal('content_article1_v2');
                    done();
                });
        });
    });
    describe('GET /articles/article2', () => {
        it(`it should return text 'content_article2' and http status 200`, done => {
            chai.request(server)
                .get('/articles/article2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.html;
                    res.text.should.be.equal('content_article2');
                    done();
                });
        });
    });
});

