import Button from '@/Components/Antd/Button';
import Card from '@/Components/Antd/Card';
import Row from '@/Components/Antd/Row';
import Col from '@/Components/Antd/Col';
import Form from '@/Components/Antd/Form';
import FormItem from '@/Components/Antd/Form.Item';
import { IAntdComp } from '@/Components/BaseComp/index.d';

export default {
  Button,
  Card,
  Row,
  Col,
  Form,
  'Form.Item': FormItem,
} as Record<string, IAntdComp<any>>;
