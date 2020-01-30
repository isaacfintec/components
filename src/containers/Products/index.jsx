import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/es';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';

import SearchBar from '../../components/SearchBar';
import TableCollapse from '../../components/TableCollapse';
import Paginator from '../../components/Paginator';
import Form from '../../components/ProductForm';

import * as ProductsApi from '../../api/products';
import { encodeQueryData } from '../../helpers/index';
import useStyles from './style';

const Products = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(-1);

  const resetEditedRow = () => {
    setEditedRow(-1);
  };

  const openForm = () => {
    setFormIsOpen(true);
  };

  const closeForm = () => {
    setFormIsOpen(false);
  };

  const fetchProducts = async () => {
    const queryParams = encodeQueryData({ search });
    const response = await ProductsApi.index(page, queryParams);
    if (response) {
      setProducts([...response.items]);
      setTotalPages(response.pages);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    resetEditedRow();
    fetchProducts();
  }, [search, page]);

  /**
   *
   * @param {String} status
   * @param {String} id
   * @returns {Function}
   */
  const toggleProductStatus = (status, id) => async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let response = null;
    if (status) response = await ProductsApi.desactivate(id);
    else response = await ProductsApi.activate(id);

    if (response) await fetchProducts();
  };

  /**
   *
   * @param {Object} form
   */
  const createProduct = async (form) => {
    const {
      interestRate,
      maxAmount,
      name,
      periods,
      type = 'semanal',
      // zone, TODO
    } = form;

    const product = {
      name,
      periods,
      type,
      interestRate,
      minAmount: maxAmount,
      maxAmount,
    };

    const response = await ProductsApi.store(product);
    if (response) closeForm();
  };

  /**
   *
   * @param {String} id
   * @returns {Function}
   */
  const updatePoduct = (id, index) => async (form) => {
    const {
      interestRate,
      maxAmount,
      name,
      periods,
      type = 'semanal',
      // zone, TODO
    } = form;

    const product = {
      name,
      periods,
      type,
      interestRate,
      minAmount: maxAmount,
      maxAmount,
    };

    const response = await ProductsApi.update(id, product);
    if (response) {
      const newProducts = [...products];
      newProducts[index] = response;
      setProducts(newProducts);
      setEditedRow(index);
      setTimeout(() => {
        resetEditedRow();
      }, 5000);
    }
  };

  const headers = [
    { key: 'tipoProducto', value: 'Tipo de producto' },
    { key: 'actualizado', value: 'Actualizado' },
    { key: 'autor', value: 'Autor' },
    { key: 'options', value: '', type: 'options' },
    { key: 'children', value: '', type: 'children' },
  ];

  const items = useMemo(() => (
    products.map((product, index) => ({
      tipoProducto: product.name,
      actualizado: moment(product.updatedAt).format('ll'),
      autor: product.comercialHouse.name,
      options: (
        <Switch
          checked={product.status}
          color="primary"
          onChange={toggleProductStatus(product.status, product._id)}
        />
      ),
      children: (
        <Form
          title="Detalles de crédito"
          onSubmit={updatePoduct(product._id, index)}
          values={{
            interestRate: product.interestRate,
            maxAmount: product.maxAmount,
            name: product.name,
            periods: product.periods,
            type: product.type,
          }}
        />
      ),
    }))
  ), [products]);

  /**
   *
   * @param {Number} newPage
   */
  const handleOnPageChange = (newPage) => {
    setPage(newPage - 1);
  };

  /**
   *
   * @param {Object} event
   */
  const handleOnEnter = (event) => {
    const {
      target: { value },
    } = event;
    setSearch(value);
  };

  return (
    <>
      <div
        className={clsx(
          { [classes.containerActive]: formIsOpen },
        )}
      >
        <Container className={classes.container} maxWidth="md">
          <div>
            <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.breadcrumbs}>
              <span>Inicio</span>
              <span>Productos</span>
            </Breadcrumbs>
            <Typography variant="h6">
              Créditos disponibles
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={1}
            >
              <Grid item sm={8}>
                <SearchBar placeholder="Encuentra aquí algún producto en específico" onEnter={handleOnEnter} />
              </Grid>
              <Grid item sm={4} className={classes.buttonContainer}>
                <Button variant="contained" color="primary" onClick={openForm}>
                  Nuevo
                </Button>
                <Button variant="outlined" color="primary">
                  CSV
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        <div
          className={clsx(
            { [classes.formToCreateContainer]: formIsOpen },
          )}
        >
          <Container maxWidth="md">
            <Collapse in={formIsOpen} className={classes.formToCreate} unmountOnExit>
              <Form
                title="Configuración de nuevo crédito"
                onCancel={closeForm}
                onSubmit={createProduct}
                editable={false}
              />
            </Collapse>
          </Container>
        </div>
      </div>
      <Container className={classes.container} maxWidth="md">
        <div>
          <TableCollapse
            headers={headers}
            items={items}
            editedRow={editedRow}
          />
        </div>
        <div>
          <Paginator
            currentPage={page + 1}
            totalPages={totalPages}
            onPageChange={handleOnPageChange}
          />
        </div>
        <div />
      </Container>
    </>
  );
};

export default Products;
